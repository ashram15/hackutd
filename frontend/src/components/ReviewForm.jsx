import { useState } from "react";
import { postReview } from "../api";

export default function ReviewForm({ vehicleId, onReviewAdded }) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        user_name: "",
        rating: 5,
        comment: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.user_name.trim() || !formData.comment.trim()) {
            setError("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);
        try {
            await postReview(vehicleId, formData);
            setFormData({ user_name: "", rating: 5, comment: "" });
            setIsOpen(false);
            if (onReviewAdded) onReviewAdded();
        } catch (err) {
            setError("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
                Write a Review
            </button>
        );
    }

    return (
        <div className="mt-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">Write a Review</h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                {error && (
                    <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                    </label>
                    <input
                        type="text"
                        value={formData.user_name}
                        onChange={(e) => handleChange("user_name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your name"
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => handleChange("rating", star)}
                                className="text-2xl transition-transform hover:scale-110"
                                disabled={isSubmitting}
                            >
                                {star <= formData.rating ? "⭐" : "☆"}
                            </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600 self-center">
                            {formData.rating} / 5
                        </span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Review
                    </label>
                    <textarea
                        value={formData.comment}
                        onChange={(e) => handleChange("comment", e.target.value)}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        placeholder="Share your experience with this vehicle..."
                        disabled={isSubmitting}
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}