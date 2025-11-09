import { useEffect, useState } from "react";
import { fetchVehicles } from "../api";
import VehicleCard from "../components/VehicleCard";
import PaymentCalculator from "../components/PaymentCalculator";
import BudgetIndicator from "../components/BudgetIndicator";
import FiltersPanel from "../components/FiltersPanel";
import { Link } from "react-router-dom";

// Wrapper component to manage car state and sync with payment calculator
function VehicleCardWithCalculator({ car, onReviewAdded }) {
    const [currentCarData, setCurrentCarData] = useState(car);
    const [showPayment, setShowPayment] = useState(false);

    return (
        <div className="flex flex-col">
            <VehicleCard
                car={car}
                onReviewAdded={onReviewAdded}
                onCarUpdate={setCurrentCarData}
            />
            <button
                onClick={() => setShowPayment(!showPayment)}
                className="mt-2 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                {showPayment ? '✕ Hide' : 'View'} Payment Options
            </button>
            {showPayment && (
                <PaymentCalculator
                    vehicleId={currentCarData.id}
                    price={currentCarData.msrp || currentCarData.price}
                />
            )}
        </div>
    );
}

export default function SearchPage() {
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({
        budget: null,
        family_size: null,
        usage: null,
        hybrid: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    async function searchVehicles() {
        setIsLoading(true);
        try {
            const params = {};
            if (filters.budget) params.budget = filters.budget;
            if (filters.family_size) params.family_size = filters.family_size;
            if (filters.usage) params.usage = filters.usage;
            if (filters.hybrid) params.hybrid = true;

            const results = await fetchVehicles(params);
            setCars(results);
        } catch (error) {
            console.error("Failed to fetch vehicles:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        searchVehicles();
    }, []);

    const handleBudgetChange = (newBudget) => {
        setFilters({ ...filters, budget: newBudget });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-red-600 text-white py-6 shadow-lg">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-center">Car Catcher</h1>
                    <p className="text-center mt-2 text-red-100">Find your perfect Toyota vehicle</p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Navigation */}
                <div className="mb-6">
                    <Link
                        to="/browse"
                        className="inline-block px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-colors"
                    >
                        Browse All Vehicles →
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sidebar - Filters */}
                    <div className="lg:col-span-1">
                        <BudgetIndicator budget={filters.budget} setBudget={handleBudgetChange} />
                        <FiltersPanel
                            filters={filters}
                            setFilters={setFilters}
                            onSearch={searchVehicles}
                        />
                    </div>

                    {/* Main Content - Vehicle Grid */}
                    <div className="lg:col-span-2">
                        <div className="mb-4 flex justify-between items-center">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Available Vehicles ({cars.length})
                            </h2>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                                <p className="mt-4 text-gray-600">Loading vehicles...</p>
                            </div>
                        ) : cars.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <p className="text-xl text-gray-600 mb-2">No vehicles found</p>
                                <p className="text-gray-500">Try adjusting your filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {cars.map((car) => (
                                    <VehicleCardWithCalculator
                                        key={car.id}
                                        car={car}
                                        onReviewAdded={searchVehicles}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm text-gray-400 mt-2">
                        Search, Compare, and Finance Your Dream Toyota
                    </p>
                </div>
            </footer>
        </div>
    );
}
