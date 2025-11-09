import { useEffect, useState } from "react";
import { fetchVehicles } from "./api";

export default function SimpleBrowse() {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadCars() {
            setIsLoading(true);
            try {
                const results = await fetchVehicles();
                setCars(results);
            } catch (error) {
                console.error("Failed to fetch vehicles:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadCars();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-red-600 text-white py-6 shadow-lg">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-center">Browse Toyota Vehicles</h1>
                    <p className="text-center mt-2 text-red-100">Explore our complete lineup</p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        All Available Vehicles ({cars.length})
                    </h2>
                </div>

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                        <p className="mt-4 text-gray-600">Loading vehicles...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cars.map((car) => (
                            <div
                                key={car.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <img
                                    src={car.image || 'https://via.placeholder.com/400x300?text=Toyota'}
                                    alt={car.model}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {car.year} {car.model}
                                    </h3>

                                    <div className="mb-3">
                                        <p className="text-sm text-gray-600 mb-1">Starting at</p>
                                        <p className="text-2xl font-bold text-red-600">
                                            ${car.price?.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="border-t pt-3">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">Base Trim:</span> {car.trim}
                                        </p>
                                        {car.available_trims && car.available_trims.length > 1 && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                +{car.available_trims.length - 1} more trim{car.available_trims.length - 1 !== 1 ? 's' : ''} available
                                            </p>
                                        )}
                                    </div>

                                    <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm text-gray-400">
                        Browse, Compare, and Finance Your Dream Toyota
                    </p>
                </div>
            </footer>
        </div>
    );
}
