import { useState, useEffect } from "react";

export default function BudgetIndicator({ budget, setBudget }) {
    const [displayBudget, setDisplayBudget] = useState(budget || 50000);

    useEffect(() => {
        setDisplayBudget(budget || 50000);
    }, [budget]);

    const handleBudgetChange = (e) => {
        const value = parseInt(e.target.value);
        setDisplayBudget(value);
        setBudget(value);
    };

    const getBudgetCategory = (amount) => {
        if (amount < 25000) return { label: "Economy", color: "text-green-600", bg: "bg-green-100" };
        if (amount < 40000) return { label: "Mid-Range", color: "text-blue-600", bg: "bg-blue-100" };
        if (amount < 60000) return { label: "Premium", color: "text-purple-600", bg: "bg-purple-100" };
        return { label: "Luxury", color: "text-red-600", bg: "bg-red-100" };
    };

    const category = getBudgetCategory(displayBudget);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Your Budget</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.bg} ${category.color}`}>
                    {category.label}
                </span>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Budget Range</span>
                    <span className="text-2xl font-bold text-red-600">
                        ${displayBudget.toLocaleString()}
                    </span>
                </div>

                <input
                    type="range"
                    min="15000"
                    max="80000"
                    step="1000"
                    value={displayBudget}
                    onChange={handleBudgetChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                        background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${((displayBudget - 15000) / (80000 - 15000)) * 100}%, #e5e7eb ${((displayBudget - 15000) / (80000 - 15000)) * 100}%, #e5e7eb 100%)`
                    }}
                />

                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$15,000</span>
                    <span>$80,000</span>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
                <button
                    onClick={() => { setDisplayBudget(20000); setBudget(20000); }}
                    className="px-3 py-2 bg-gray-100 hover:bg-red-600 hover:text-white rounded text-sm transition-colors"
                >
                    $20K
                </button>
                <button
                    onClick={() => { setDisplayBudget(30000); setBudget(30000); }}
                    className="px-3 py-2 bg-gray-100 hover:bg-red-600 hover:text-white rounded text-sm transition-colors"
                >
                    $30K
                </button>
                <button
                    onClick={() => { setDisplayBudget(45000); setBudget(45000); }}
                    className="px-3 py-2 bg-gray-100 hover:bg-red-600 hover:text-white rounded text-sm transition-colors"
                >
                    $45K
                </button>
                <button
                    onClick={() => { setDisplayBudget(60000); setBudget(60000); }}
                    className="px-3 py-2 bg-gray-100 hover:bg-red-600 hover:text-white rounded text-sm transition-colors"
                >
                    $60K
                </button>
            </div>
        </div>
    );
}