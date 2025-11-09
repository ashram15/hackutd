import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchVehicles } from "../api";

export default function BuildPage() {
    const [exteriorColor, setExteriorColor] = useState("");
    const [interiorColor, setInteriorColor] = useState("");
    const [trim, setTrim] = useState("LE");
    const [seats, setSeats] = useState(5);
    const [drivetrain, setDrivetrain] = useState("FWD");
    const packagesList = [
        "1500W inverter",
        "50 State Emissions",
        "Digital rearview mirror with HomeLink® universal transceiver",
        "Entertainment Package",
        "LE Plus Package",
        "Roof rails",
        "Spare tire",
        "Vehicle Protection Package",
        "Vehicle Protection Premium Package",
        "XLE Plus Package",
        "XSE Premium Package",
    ];
    const [selectedPackages, setSelectedPackages] = useState(new Set());
    const [submitted, setSubmitted] = useState(false);
    const [matchedCars, setMatchedCars] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    function togglePackage(name) {
        const next = new Set(selectedPackages);
        if (next.has(name)) next.delete(name);
        else next.add(name);
        setSelectedPackages(next);
    }

    function validateSeats(n) {
        const value = Number(n);
        if (Number.isNaN(value)) return false;
        return value >= 1 && value < 8; // seats must be below 8
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateSeats(seats)) {
            alert("Seats must be a number between 1 and 7 (below 8).");
            return;
        }
        setSubmitted(true);

        // Fetch vehicles from backend then filter client-side by selected criteria
        setSearchLoading(true);
        setSearchError(null);
        try {
            const vehicles = await fetchVehicles();

            const trimLower = (trim || "").toString().toLowerCase();
            const drivetrainLower = (drivetrain || "").toString().toLowerCase();

            const matches = vehicles.filter(v => {
                // seats: vehicle must have at least as many seats as requested
                if (!(v.seats >= seats)) return false;

                // drivetrain: match FWD exactly, for AWD accept AWD or 4WD
                const vDrive = (v.drivetrain || "").toString().toLowerCase();
                if (drivetrainLower === "fwd" && !vDrive.includes("fwd")) return false;
                if (drivetrainLower === "awd" && !(vDrive.includes("awd") || vDrive.includes("4wd") || vDrive.includes("4x4"))) return false;

                // trim: check top-level trim or available_trims
                const topTrim = (v.trim || "").toString().toLowerCase();
                if (topTrim.includes(trimLower)) return true;
                if (Array.isArray(v.available_trims)) {
                    const found = v.available_trims.some(t => (t.trim || "").toString().toLowerCase().includes(trimLower));
                    if (found) return true;
                }

                // if trim didn't match, exclude
                return false;
            });

            setMatchedCars(matches);
        } catch (err) {
            console.error(err);
            setSearchError("Failed to fetch vehicles");
        } finally {
            setSearchLoading(false);
        }
    }

    const result = {
        exteriorColor,
        interiorColor,
        trim,
        seats,
        drivetrain,
        packages: Array.from(selectedPackages),
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Build Your Own Car</h1>
                    <Link to="/" className="text-sm text-red-600 hover:underline">← Back</Link>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">Exterior color (name)</span>
                            <input value={exteriorColor} onChange={e => setExteriorColor(e.target.value)} placeholder="e.g. Arctic White" className="mt-1 p-2 border rounded" />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">Interior color (name)</span>
                            <input value={interiorColor} onChange={e => setInteriorColor(e.target.value)} placeholder="e.g. Black" className="mt-1 p-2 border rounded" />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">Trim</span>
                            <select value={trim} onChange={e => setTrim(e.target.value)} className="mt-1 p-2 border rounded">
                                <option>LE</option>
                                <option>SE</option>
                                <option>XLE</option>
                                <option>XSE</option>
                                <option>Limited</option>
                                <option>Platinum</option>
                                <option>TRD Pro</option>
                            </select>
                        </label>

                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">Seats (1-7)</span>
                            <input type="number" min="1" max="7" value={seats} onChange={e => setSeats(Number(e.target.value))} className="mt-1 p-2 border rounded" />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">Drivetrain</span>
                            <select value={drivetrain} onChange={e => setDrivetrain(e.target.value)} className="mt-1 p-2 border rounded">
                                <option>FWD</option>
                                <option>AWD</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Packages</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {packagesList.map(pkg => (
                                <label key={pkg} className="inline-flex items-center gap-2 p-2 border rounded">
                                    <input type="checkbox" checked={selectedPackages.has(pkg)} onChange={() => togglePackage(pkg)} />
                                    <span className="text-sm">{pkg}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button type="submit" className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700">Preview Build</button>
                        <button type="button" onClick={() => { setExteriorColor(""); setInteriorColor(""); setTrim("LE"); setSeats(5); setDrivetrain("FWD"); setSelectedPackages(new Set()); setSubmitted(false); }} className="px-4 py-2 border rounded">Reset</button>
                    </div>
                </form>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">Build Summary</h3>
                    <div className="bg-gray-50 p-4 rounded border">
                        <p><strong>Exterior:</strong> {exteriorColor || <em className="text-gray-400">(not set)</em>}</p>
                        <p><strong>Interior:</strong> {interiorColor || <em className="text-gray-400">(not set)</em>}</p>
                        <p><strong>Trim:</strong> {trim}</p>
                        <p><strong>Seats:</strong> {seats}</p>
                        <p><strong>Drivetrain:</strong> {drivetrain}</p>
                        <p className="mt-2"><strong>Packages:</strong> {Array.from(selectedPackages).length ? <ul className="list-disc ml-6">{Array.from(selectedPackages).map(p => <li key={p}>{p}</li>)}</ul> : <em className="text-gray-400">None selected</em>}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">Cars like your dreams</h3>
                    {searchLoading ? (
                        <p className="text-sm text-gray-600">Searching cars...</p>
                    ) : searchError ? (
                        <p className="text-sm text-red-600">{searchError}</p>
                    ) : matchedCars.length === 0 ? (
                        <p className="text-sm text-gray-500">No cars match your build yet. Click Preview Build to search.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {matchedCars.map(car => (
                                <div key={car.id} className="bg-white rounded-lg shadow p-3">
                                    <img src={car.image || 'https://via.placeholder.com/400x300?text=Toyota'} alt={car.model} className="w-full h-36 object-contain bg-gray-50" />
                                    <h4 className="font-semibold mt-2">{car.year} {car.model}</h4>
                                    <p className="text-sm text-gray-600">Trim: {car.trim}</p>
                                    <p className="text-red-600 font-bold">${car.price?.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {submitted && (
                    <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded">
                        <h4 className="font-semibold">Ready to order</h4>
                        <pre className="mt-2 text-sm overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
