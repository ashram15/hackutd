import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useFavorites } from "../context/FavoritesContext";
import { fetchVehicleById } from "../api";

export default function FavoritesPage() {
    const { isAuthenticated } = useAuth0();
    const { favorites, remove } = useFavorites();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            if (!isAuthenticated) return;
            setLoading(true);
            try {
                const fetched = [];
                for (const id of favorites) {
                    try {
                        const v = await fetchVehicleById(id);
                        fetched.push(v);
                    } catch {
                        // ignore missing vehicle
                    }
                }
                setVehicles(fetched);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [favorites, isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
                <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
                    <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
                    <p className="text-gray-600 mb-4">Log in to view and manage your favorite vehicles.</p>
                    <p className="text-sm text-gray-500">Use the Log In button in the header.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Your Favorites ({favorites.length})</h1>
                {loading ? (
                    <p className="text-gray-600">Loading favorites...</p>
                ) : favorites.length === 0 ? (
                    <div className="bg-white p-8 rounded shadow text-center">
                        <p className="text-gray-600 mb-2">You haven't favorited any vehicles yet.</p>
                        <p className="text-sm text-gray-500">Tap the heart icon on a vehicle to add it here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vehicles.map((car) => (
                            <div key={car.id} className="bg-white rounded-lg shadow p-4 relative">
                                <button
                                    onClick={() => remove(car.id)}
                                    className="absolute top-2 right-2 text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded"
                                >Remove</button>
                                <img src={car.image} alt={car.model} className="w-full h-40 object-contain mb-3 bg-gray-50 rounded" />
                                <h3 className="text-lg font-semibold mb-1">{car.year} {car.model}</h3>
                                <p className="text-red-600 font-bold mb-2">${(car.msrp || car.price)?.toLocaleString()}</p>
                                <p className="text-xs text-gray-600">{car.trim} • {car.mpg_city}/{car.mpg_highway} MPG • {car.drivetrain}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
