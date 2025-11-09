import { useState } from "react";

export default function FiltersPanel({ filters, setFilters, onSearch }) {
    const usageOptions = [
        { value: "work", label: "Work Commute", icon: "" },
        { value: "family", label: "Family & Kids", icon: "" },
        { value: "travel", label: "Travel & Adventure", icon: "" },
        { value: "daily", label: "Daily Errands", icon: "" },
        { value: "luxury", label: "Luxury & Style", icon: "" }
    ];

    const handleFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value });
    };

    const clearFilters = () => {
        setFilters({
            budget: null,
            family_size: null,
            usage: null,
            hybrid: false,
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Filter Your Search</h2>
                <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                    Clear All
                </button>
            </div>

            {/* Family Size Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Family Size (Number of Seats)
                </label>
                <div className="grid grid-cols-4 gap-2">
                    {[2, 5, 7, 8].map((seats) => (
                        <button
                            key={seats}
                            onClick={() => handleFilterChange("family_size", seats)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all ${filters.family_size === seats
                                ? "border-red-600 bg-red-50 text-red-600 font-semibold"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            {seats}+ seats
                        </button>
                    ))}
                </div>
            </div>

            {/* Usage Type Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    What will you use it for?
                </label>
                <div className="grid grid-cols-1 gap-2">
                    {usageOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleFilterChange("usage", option.value)}
                            className={`px-4 py-3 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${filters.usage === option.value
                                ? "border-red-600 bg-red-50 text-red-600 font-semibold"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <span className="text-2xl">{option.icon}</span>
                            <span>{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Hybrid Only Toggle */}
            <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={!!filters.hybrid}
                        onChange={(e) => handleFilterChange("hybrid", e.target.checked)}
                        className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        Hybrid only
                    </span>
                </label>
            </div>

            {/* Active Filters Summary */}
            {(filters.budget || filters.family_size || filters.usage || filters.hybrid) && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
                    <div className="flex flex-wrap gap-2">
                        {filters.budget && (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                Budget: ${filters.budget.toLocaleString()}
                            </span>
                        )}
                        {filters.family_size && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                {filters.family_size}+ seats
                            </span>
                        )}
                        {filters.usage && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                {usageOptions.find(o => o.value === filters.usage)?.label}
                            </span>
                        )}
                        {filters.hybrid && (
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                                Hybrid only
                            </span>
                        )}
                    </div>
                </div>
            )}

            <button
                onClick={onSearch}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
                Apply Filters & Search
            </button>
        </div>
    );
}