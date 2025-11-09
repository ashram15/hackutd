import { useState } from "react";
import { getFinance } from "../api";

export default function PaymentCalculator({ vehicleId, price }) {
    const [downPayment, setDownPayment] = useState(5000);
    const [months, setMonths] = useState(60);
    const [rate, setRate] = useState(5.0);
    const [isLease, setIsLease] = useState(false);
    const [monthly, setMonthly] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);

    async function calculate() {
        setIsCalculating(true);
        try {
            const result = await getFinance(vehicleId, months, rate, isLease);
            setMonthly(result.monthly_payment);
        } catch (error) {
            console.error("Failed to calculate payment:", error);
            // Fallback calculation
            const principal = price - downPayment;
            const monthlyRate = rate / 100 / 12;
            const payment = isLease
                ? (principal / months) * 1.02
                : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
            setMonthly(payment.toFixed(2));
        } finally {
            setIsCalculating(false);
        }
    }

    return (
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">Payment Calculator</h4>

            {/* Finance vs Lease Toggle */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setIsLease(false)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${!isLease
                            ? "bg-red-600 text-white"
                            : "bg-white text-gray-600 border border-gray-300"
                        }`}
                >
                    Finance
                </button>
                <button
                    onClick={() => setIsLease(true)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${isLease
                            ? "bg-red-600 text-white"
                            : "bg-white text-gray-600 border border-gray-300"
                        }`}
                >
                    Lease
                </button>
            </div>

            <div className="space-y-3">
                {/* Down Payment */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Down Payment: ${downPayment.toLocaleString()}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max={price * 0.3}
                        step="500"
                        value={downPayment}
                        onChange={(e) => setDownPayment(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>$0</span>
                        <span>${(price * 0.3).toLocaleString()}</span>
                    </div>
                </div>

                {/* Term Length */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Term: {months} months
                    </label>
                    <select
                        value={months}
                        onChange={(e) => setMonths(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="24">24 months (2 years)</option>
                        <option value="36">36 months (3 years)</option>
                        <option value="48">48 months (4 years)</option>
                        <option value="60">60 months (5 years)</option>
                        <option value="72">72 months (6 years)</option>
                    </select>
                </div>

                {/* Interest Rate */}
                {!isLease && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Interest Rate: {rate.toFixed(1)}%
                        </label>
                        <input
                            type="range"
                            min="2"
                            max="12"
                            step="0.5"
                            value={rate}
                            onChange={(e) => setRate(parseFloat(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>2%</span>
                            <span>12%</span>
                        </div>
                    </div>
                )}

                <button
                    onClick={calculate}
                    disabled={isCalculating}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400"
                >
                    {isCalculating ? "Calculating..." : "Calculate Payment"}
                </button>

                {monthly !== null && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">
                            Estimated Monthly Payment:
                        </div>
                        <div className="text-2xl font-bold text-green-700">
                            ${monthly.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            Total: ${((monthly * months) + downPayment).toLocaleString()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
