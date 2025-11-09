// Use environment variable for API base (configure in .env as VITE_API_BASE_URL)
const BASE_URL = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : "http://localhost:8000/api";

// Fetch all vehicles with optional filters
export async function fetchVehicles(filters = {}) {
    const params = new URLSearchParams();
    if (filters.budget) params.append('budget', filters.budget);
    if (filters.family_size) params.append('family_size', filters.family_size);
    if (filters.usage) params.append('usage', filters.usage);
    if (filters.hybrid) params.append('hybrid', 'true');

    const res = await fetch(`${BASE_URL}/vehicles?${params}`);
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    return res.json();
}

// Fetch a single vehicle by ID
export async function fetchVehicleById(id) {
    const res = await fetch(`${BASE_URL}/vehicles/${id}`);
    if (!res.ok) throw new Error('Failed to fetch vehicle');
    return res.json();
}

// Post a review for a vehicle
export async function postReview(vehicleId, review) {
    const res = await fetch(`${BASE_URL}/vehicles/${vehicleId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });
    if (!res.ok) throw new Error('Failed to post review');
    return res.json();
}

// Calculate finance or lease payment
export async function getFinance(vehicleId, months = 60, rate = 5.0, lease = false) {
    const params = new URLSearchParams({
        months: months.toString(),
        rate: rate.toString(),
        lease: lease.toString()
    });
    const res = await fetch(`${BASE_URL}/vehicles/${vehicleId}/finance?${params}`);
    if (!res.ok) throw new Error('Failed to calculate finance');
    return res.json();
}
