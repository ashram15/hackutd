import { useState } from "react";
import api from "../api";

export default function PaymentCalculator({ price }) {
    const [down, setDown] = useState(2000);
    const [monthly, setMonthly] = useState(null);

    async function calculate() {
        const res = await api.get("/calculate/finance", { params: { price, down } });
        setMonthly(res.data.monthly);
    }

    return (
        <div className="mt-3">
            <input
                type="number"
                value={down}
                onChange={(e) => setDown(parseFloat(e.target.value))}
                placeholder="Down Payment"
                className="border p-1"
            />
            <button onClick={calculate} className="ml-2 bg-red-600 text-white px-3 py-1 rounded">
                Calculate
            </button>
            {monthly && <p className="mt-2">Estimated monthly: ${monthly}</p>}
        </div>
    );
}
