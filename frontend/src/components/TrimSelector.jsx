import { useState, useMemo } from "react";

export default function TrimSelector({ car, onTrimChange, hybridOnly = false }) {
    const [selectedTrim, setSelectedTrim] = useState(car.trim);

    const visibleTrims = useMemo(() => {
        const list = car.available_trims || [];
        return hybridOnly ? list.filter(t => t.is_hybrid) : list;
    }, [car.available_trims, hybridOnly]);

    const handleTrimSelect = (trimOption) => {
        setSelectedTrim(trimOption.trim);
        onTrimChange(trimOption);
    };

    if (!visibleTrims || visibleTrims.length === 0) {
        return null;
    }

    return (
        <div className="mb-4 border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Select Trim Level
            </h4>
            <div className="grid grid-cols-1 gap-2">
                {visibleTrims.map((trimOption, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleTrimSelect(trimOption)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${selectedTrim === trimOption.trim
                            ? "border-red-600 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                            }`}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className={`font-semibold ${selectedTrim === trimOption.trim
                                ? "text-red-600"
                                : "text-gray-800"
                                }`}>
                                {trimOption.trim}
                            </span>
                            <span className={`text-lg font-bold ${selectedTrim === trimOption.trim
                                ? "text-red-600"
                                : "text-gray-700"
                                }`}>
                                ${trimOption.price.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex gap-3 text-xs text-gray-600">
                            <span>🚗 {trimOption.mpg_city}/{trimOption.mpg_highway} MPG</span>
                            <span>•</span>
                            <span>{trimOption.drivetrain}</span>
                            {trimOption.is_hybrid && (
                                <>
                                    <span>•</span>
                                    <span className="text-emerald-700">Hybrid</span>
                                </>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
