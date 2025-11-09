import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useFavorites } from "../context/FavoritesContext";
import ReviewForm from "./ReviewForm";
import TrimSelector from "./TrimSelector";

export default function VehicleCard({ car, onReviewAdded, onCarUpdate, hybridOnly = false }) {
    const [currentCar, setCurrentCar] = useState(car);
    const { isAuthenticated } = useAuth0();
    const { isFavorite, toggle } = useFavorites();

    const averageReviewRating = currentCar.reviews && currentCar.reviews.length > 0
        ? (currentCar.reviews.reduce((sum, r) => sum + r.rating, 0) / currentCar.reviews.length).toFixed(1)
        : "No reviews yet";

    const handleTrimChange = (trimOption) => {
        // Update the car data with the selected trim
        const updatedCar = {
            ...currentCar,
            trim: trimOption.trim,
            price: trimOption.price,
            msrp: trimOption.msrp,
            mpg_city: trimOption.mpg_city,
            mpg_highway: trimOption.mpg_highway,
            drivetrain: trimOption.drivetrain
        };
        setCurrentCar(updatedCar);
        // Notify parent component about the update
        if (onCarUpdate) {
            onCarUpdate(updatedCar);
        }
    };

    return (
        <div className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow relative">
            {isAuthenticated && (
                <button
                    onClick={() => toggle(currentCar.id)}
                    className={`absolute top-3 right-3 rounded-full p-2 shadow ${isFavorite(currentCar.id) ? 'bg-red-600 text-white' : 'bg-white text-gray-700'} hover:scale-105 transition`}
                    aria-label={isFavorite(currentCar.id) ? 'Unfavorite' : 'Favorite'}
                    title={isFavorite(currentCar.id) ? 'Unfavorite' : 'Favorite'}
                >
                    {isFavorite(currentCar.id) ? '♥' : '♡'}
                </button>
            )}
            <img src={currentCar.image} alt={currentCar.model} className="w-full h-48 object-contain rounded mb-3 bg-gray-50" />

            <h3 className="text-xl font-bold text-gray-800 mb-1">
                {currentCar.year} {currentCar.model} {currentCar.trim}
            </h3>

            <p className="text-2xl font-bold text-red-600 mb-2">
                ${currentCar.msrp?.toLocaleString() || currentCar.price?.toLocaleString()}
            </p>

            <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>🚗 {currentCar.mpg_city}/{currentCar.mpg_highway} MPG</span>
                    <span>•</span>
                    <span>{currentCar.drivetrain}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>💺 {currentCar.seats} seats</span>
                    <span>•</span>
                    <span>🏷️ {currentCar.category}</span>
                </div>
            </div>

            {/* Trim Selector */}
            <TrimSelector car={currentCar} onTrimChange={handleTrimChange} hybridOnly={hybridOnly} />

            {/* Ratings Section */}
            <div className="border-t pt-3 mb-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Expert Ratings</h4>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 p-2 rounded">
                        <div className="text-xs text-gray-600">Carfax</div>
                        <div className="text-lg font-bold text-blue-600">
                            ⭐ {currentCar.carfax_rating}
                        </div>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                        <div className="text-xs text-gray-600">Kelly Blue Book</div>
                        <div className="text-lg font-bold text-green-600">
                            ⭐ {currentCar.kelly_blue_rating}
                        </div>
                    </div>
                </div>
            </div>

            {/* User Reviews Section */}
            <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold text-gray-700">User Reviews</h4>
                    <span className="text-sm text-gray-600">
                        {currentCar.reviews?.length || 0} review{(currentCar.reviews?.length || 0) !== 1 ? 's' : ''}
                    </span>
                </div>

                {currentCar.reviews && currentCar.reviews.length > 0 && (
                    <div className="mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-yellow-600">
                                {averageReviewRating}
                            </span>
                            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                        </div>
                        <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                            {currentCar.reviews.slice(0, 2).map((review, idx) => (
                                <div key={idx} className="bg-gray-50 p-2 rounded text-xs">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-semibold">{review.user_name}</span>
                                        <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <ReviewForm vehicleId={currentCar.id} onReviewAdded={onReviewAdded} />
        </div>
    );
}
