export default function VehicleCard({ car }) {
    return (
        <div className="border rounded-lg shadow p-4">
            <img src={car.image} alt={car.model} className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{car.year} {car.model} {car.trim}</h3>
            <p>MSRP: ${car.msrp}</p>
            <p>{car.mpg_city}/{car.mpg_highway} MPG • {car.drivetrain}</p>
        </div>
    );
}
