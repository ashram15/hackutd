import { useEffect, useState } from "react";
import { fetchVehicles } from "../api";
import { Link } from "react-router-dom";

export default function BrowsePage() {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [hybridOnly, setHybridOnly] = useState(false);

    useEffect(() => {
        async function loadCars() {
            setIsLoading(true);
            try {
                const results = await fetchVehicles({ hybrid: hybridOnly });
                setCars(results);
            } catch (error) {
                console.error("Failed to fetch vehicles:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadCars();
    }, [hybridOnly]);

    const selected = selectedCar ? cars.find(c => c.id === selectedCar) : null;

    const categoryOrder = ["Sedan", "Minivan", "SUV", "Truck", "Sports Car"]; // preferred order
    const groupedEntries = Object.entries(
        cars.reduce((acc, car) => {
            const key = car.category || "Other";
            if (!acc[key]) acc[key] = [];
            acc[key].push(car);
            return acc;
        }, {})
    ).sort((a, b) => {
        const ai = categoryOrder.indexOf(a[0]);
        const bi = categoryOrder.indexOf(b[0]);
        const aRank = ai === -1 ? 99 : ai;
        const bRank = bi === -1 ? 99 : bi;
        if (aRank !== bRank) return aRank - bRank;
        return a[0].localeCompare(b[0]);
    });

    // Combine Sedan and Minivan into "Cars & Minivans" section
    const displayEntries = [];
    let sedans = [];
    let minivans = [];

    for (const [category, list] of groupedEntries) {
        if (category === "Sedan") {
            sedans = list;
        } else if (category === "Minivan") {
            minivans = list;
        } else {
            displayEntries.push([category, list]);
        }
    }

    // Add combined section at the beginning if either exists
    if (sedans.length > 0 || minivans.length > 0) {
        displayEntries.unshift(["Cars & Minivans", [...sedans, ...minivans]]);
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-red-600 text-white py-6 shadow-lg">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-center">Car Catcher</h1>
                    <p className="text-center mt-2 text-red-100">Explore our complete lineup</p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-6 flex gap-4 items-center flex-wrap">
                    <Link
                        to="/"
                        className="px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-colors"
                    >
                        ← Back to Advanced Search
                    </Link>

                    <label className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow cursor-pointer select-none text-sm">
                        <input
                            type="checkbox"
                            checked={hybridOnly}
                            onChange={(e) => setHybridOnly(e.target.checked)}
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <span className="font-medium text-gray-700">Hybrid only</span>
                    </label>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Available Vehicles ({cars.length})
                    </h2>
                </div>

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                        <p className="mt-4 text-gray-600">Loading vehicles...</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {displayEntries.map(([category, list]) => (
                            <section key={category}>
                                <div className="flex items-baseline justify-between mb-3">
                                    <h3 className="text-2xl font-semibold text-gray-800">{category}</h3>
                                    <span className="text-sm text-gray-500">{list.length} {list.length === 1 ? 'vehicle' : 'vehicles'}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {list.map((car) => (
                                        <div
                                            key={car.id}
                                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                        >
                                            <img
                                                src={car.image || 'https://via.placeholder.com/400x300?text=Toyota'}
                                                alt={car.model}
                                                className="w-full h-48 object-contain bg-gray-50"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                    {car.year} {car.model}
                                                </h3>
                                                <div className="mb-3">
                                                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">Starting at {car.available_trims?.some(t => t.is_hybrid) && (
                                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs">Hybrid Available</span>
                                                    )}</p>
                                                    <p className="text-2xl font-bold text-red-600 flex items-center gap-2">
                                                        ${car.price?.toLocaleString()}
                                                        {car.available_trims && car.available_trims[0]?.is_hybrid && (
                                                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">Hybrid</span>
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="border-t pt-3">
                                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                                        <span className="font-semibold">Base Trim:</span> {car.trim}
                                                        {car.available_trims && car.available_trims[0]?.is_hybrid && (
                                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs">Hybrid</span>
                                                        )}
                                                    </p>
                                                    {car.available_trims && car.available_trims.length > 1 && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            +{car.available_trims.length - 1} more trim{car.available_trims.length - 1 !== 1 ? 's' : ''} available
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => setSelectedCar(car.id)}
                                                    className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">
                                {selected.year} {selected.model} — {selected.trim}
                            </h3>
                            <button
                                onClick={() => setSelectedCar(null)}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-4">
                            <img
                                src={selected.image || 'https://via.placeholder.com/800x400?text=Toyota'}
                                alt={selected.model}
                                className="w-full h-48 object-contain bg-gray-50 rounded"
                            />
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-1">Starting at</p>
                                <p className="text-3xl font-bold text-red-600">${(selected.price || selected.msrp)?.toLocaleString?.() || selected.price}</p>
                                <p className="mt-2 text-gray-700">
                                    Base Trim: <span className="font-semibold">{selected.trim}</span>
                                </p>
                            </div>
                        </div>
                        <div className="p-4 border-t flex gap-2 justify-end">
                            <button
                                onClick={() => setSelectedCar(null)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                            >
                                Close
                            </button>
                            <Link
                                to="/"
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                                onClick={() => setSelectedCar(null)}
                            >
                                See Full Details
                            </Link>
                        </div>
                    </div>
                </div>
            )}

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
