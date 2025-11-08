import { useEffect, useState } from "react";
import api from "./api";
import VehicleCard from "./components/VehicleCard";
import PaymentCalculator from "./components/PaymentCalculator";

export default function App() {
    const [cars, setCars] = useState([]);
    const [query, setQuery] = useState("");

    async function search() {
        const res = await api.get("/vehicles", { params: { q: query } });
        setCars(res.data);
    }

    useEffect(() => { search(); }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-red-700">Toyota Car Finder</h1>
            <div className="flex mb-4">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for Camry, RAV4..."
                    className="flex-grow border p-2 rounded-l"
                />
                <button onClick={search} className="bg-red-600 text-white px-4 rounded-r">Search</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cars.map((car) => (
                    <div key={car.id}>
                        <VehicleCard car={car} />
                        <PaymentCalculator price={car.msrp} />
                    </div>
                ))}
            </div>
        </div>
    );
}
