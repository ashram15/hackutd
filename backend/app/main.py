from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Allow frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models


class Review(BaseModel):
    user_name: str
    rating: int
    comment: str


class TrimOption(BaseModel):
    trim: str
    price: float
    msrp: float
    drivetrain: str
    mpg_city: int
    mpg_highway: int
    is_hybrid: bool = False


class Vehicle(BaseModel):
    id: int
    name: str
    year: int
    model: str
    trim: str
    price: float
    msrp: float
    seats: int
    category: str
    mpg_city: int
    mpg_highway: int
    drivetrain: str
    carfax_rating: float
    kelly_blue_rating: float
    image: str
    available_trims: List[TrimOption] = []
    reviews: List[Review] = []


# Mock Toyota vehicle data with expanded lineup
vehicles: List[Vehicle] = [
    Vehicle(
        id=1,
        name="Toyota Camry",
        year=2025,
        model="Camry",
        trim="LE",
        price=28000,
        msrp=28000,
        seats=5,
        category="Sedan",
        mpg_city=28,
        mpg_highway=39,
        drivetrain="FWD",
        carfax_rating=4.5,
        kelly_blue_rating=4.3,
        image="https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2025/camry/xse/5.png",
        available_trims=[
            TrimOption(trim="LE", price=28000, msrp=28000,
                       drivetrain="FWD", mpg_city=28, mpg_highway=39),
            TrimOption(trim="SE", price=30000, msrp=30000,
                       drivetrain="FWD", mpg_city=28, mpg_highway=39),
            TrimOption(trim="XLE", price=33000, msrp=33000,
                       drivetrain="FWD", mpg_city=26, mpg_highway=37),
            TrimOption(trim="XSE", price=35000, msrp=35000,
                       drivetrain="FWD", mpg_city=26, mpg_highway=37),
            TrimOption(trim="TRD", price=37000, msrp=37000,
                       drivetrain="FWD", mpg_city=25, mpg_highway=36),
            # Hybrid trims
            TrimOption(trim="LE Hybrid", price=31000, msrp=31000,
                       drivetrain="FWD", mpg_city=51, mpg_highway=53, is_hybrid=True),
            TrimOption(trim="SE Hybrid", price=33000, msrp=33000,
                       drivetrain="FWD", mpg_city=51, mpg_highway=53, is_hybrid=True),
            TrimOption(trim="XLE Hybrid", price=36000, msrp=36000,
                       drivetrain="FWD", mpg_city=47, mpg_highway=50, is_hybrid=True),
            TrimOption(trim="XSE Hybrid", price=38000, msrp=38000,
                       drivetrain="FWD", mpg_city=47, mpg_highway=50, is_hybrid=True),
        ],
        reviews=[
            Review(user_name="John D.", rating=5,
                   comment="Perfect for daily commute, great fuel economy!")
        ]
    ),
    Vehicle(
        id=2,
        name="Toyota Highlander",
        year=2025,
        model="Highlander",
        trim="L",
        price=42000,
        msrp=42000,
        seats=8,
        category="SUV",
        mpg_city=21,
        mpg_highway=29,
        drivetrain="FWD",
        carfax_rating=4.7,
        kelly_blue_rating=4.5,
        image="https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2025/highlander/xle/040.png",
        available_trims=[
            TrimOption(trim="L", price=42000, msrp=42000,
                       drivetrain="FWD", mpg_city=21, mpg_highway=29),
            TrimOption(trim="LE", price=45000, msrp=45000,
                       drivetrain="AWD", mpg_city=21, mpg_highway=28),
            TrimOption(trim="XLE", price=48000, msrp=48000,
                       drivetrain="AWD", mpg_city=21, mpg_highway=28),
            TrimOption(trim="Limited", price=52000, msrp=52000,
                       drivetrain="AWD", mpg_city=20, mpg_highway=27),
            TrimOption(trim="Platinum", price=56000, msrp=56000,
                       drivetrain="AWD", mpg_city=20, mpg_highway=27),
        ],
        reviews=[
            Review(user_name="Sarah M.", rating=5,
                   comment="Amazing family vehicle, spacious and comfortable!")
        ]
    ),
    Vehicle(
        id=3,
        name="Toyota RAV4",
        year=2025,
        model="RAV4",
        trim="LE",
        price=32000,
        msrp=32000,
        seats=5,
        category="SUV",
        mpg_city=27,
        mpg_highway=35,
        drivetrain="FWD",
        carfax_rating=4.6,
        kelly_blue_rating=4.4,
        image="https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2025/rav4/xle/040.png",
        available_trims=[
            TrimOption(trim="LE", price=32000, msrp=32000,
                       drivetrain="FWD", mpg_city=27, mpg_highway=35),
            TrimOption(trim="XLE", price=35000, msrp=35000,
                       drivetrain="AWD", mpg_city=27, mpg_highway=33),
            TrimOption(trim="XLE Premium", price=38000, msrp=38000,
                       drivetrain="AWD", mpg_city=27, mpg_highway=33),
            TrimOption(trim="Adventure", price=40000, msrp=40000,
                       drivetrain="AWD", mpg_city=25, mpg_highway=32),
            TrimOption(trim="Limited", price=42000, msrp=42000,
                       drivetrain="AWD", mpg_city=27, mpg_highway=33),
            TrimOption(trim="TRD Off-Road", price=41000, msrp=41000,
                       drivetrain="AWD", mpg_city=25, mpg_highway=32),
        ],
        reviews=[
            Review(user_name="Mike T.", rating=4,
                   comment="Great for adventure trips, reliable and practical.")
        ]
    ),
    Vehicle(
        id=4,
        name="Toyota Corolla",
        year=2025,
        model="Corolla",
        trim="L",
        price=21000,
        msrp=21000,
        seats=5,
        category="Sedan",
        mpg_city=30,
        mpg_highway=38,
        drivetrain="FWD",
        carfax_rating=4.4,
        kelly_blue_rating=4.2,
        image="https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2025/corolla/le/040.png",
        available_trims=[
            TrimOption(trim="L", price=21000, msrp=21000,
                       drivetrain="FWD", mpg_city=30, mpg_highway=38),
            TrimOption(trim="LE", price=23000, msrp=23000,
                       drivetrain="FWD", mpg_city=30, mpg_highway=38),
            TrimOption(trim="SE", price=25000, msrp=25000,
                       drivetrain="FWD", mpg_city=30, mpg_highway=37),
            TrimOption(trim="XLE", price=27000, msrp=27000,
                       drivetrain="FWD", mpg_city=30, mpg_highway=38),
            TrimOption(trim="XSE", price=28000, msrp=28000,
                       drivetrain="FWD", mpg_city=30, mpg_highway=37),
        ],
        reviews=[]
    ),
    Vehicle(
        id=5,
        name="Toyota Sienna",
        year=2025,
        model="Sienna",
        trim="LE",
        price=38000,
        msrp=38000,
        seats=8,
        category="Minivan",
        mpg_city=36,
        mpg_highway=36,
        drivetrain="FWD",
        carfax_rating=4.6,
        kelly_blue_rating=4.4,
        image="https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2025/sienna/xle/040.png",
        available_trims=[
            # Sienna is hybrid-only
            TrimOption(trim="LE", price=38000, msrp=38000,
                       drivetrain="FWD", mpg_city=36, mpg_highway=36, is_hybrid=True),
            TrimOption(trim="XLE", price=42000, msrp=42000,
                       drivetrain="AWD", mpg_city=35, mpg_highway=35, is_hybrid=True),
            TrimOption(trim="XSE", price=45000, msrp=45000,
                       drivetrain="AWD", mpg_city=35, mpg_highway=35, is_hybrid=True),
            TrimOption(trim="Limited", price=50000, msrp=50000,
                       drivetrain="AWD", mpg_city=35, mpg_highway=35, is_hybrid=True),
            TrimOption(trim="Platinum", price=55000, msrp=55000,
                       drivetrain="AWD", mpg_city=35, mpg_highway=35, is_hybrid=True),
        ],
        reviews=[
            Review(user_name="Emily R.", rating=5,
                   comment="Best minivan for families with kids!")
        ]
    ),
    Vehicle(
        id=6,
        name="Toyota 4Runner",
        year=2025,
        model="4Runner",
        trim="SR5",
        price=44000,
        msrp=44000,
        seats=7,
        category="SUV",
        mpg_city=16,
        mpg_highway=19,
        drivetrain="4WD",
        carfax_rating=4.8,
        kelly_blue_rating=4.6,
        image="https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2024/4runner/sr5/040.png",
        available_trims=[
            TrimOption(trim="SR5", price=44000, msrp=44000,
                       drivetrain="4WD", mpg_city=16, mpg_highway=19),
            TrimOption(trim="TRD Off-Road", price=48000, msrp=48000,
                       drivetrain="4WD", mpg_city=16, mpg_highway=19),
            TrimOption(trim="TRD Pro", price=54000, msrp=54000,
                       drivetrain="4WD", mpg_city=16, mpg_highway=18),
            TrimOption(trim="Limited", price=52000, msrp=52000,
                       drivetrain="4WD", mpg_city=16, mpg_highway=19),
        ],
        reviews=[]
    ),
    Vehicle(
        id=7,
        name="GR Supra",
        year=2025,
        model="GR Supra",
        trim="2.0",
        price=47000,
        msrp=47000,
        seats=2,
        category="Sports Car",
        mpg_city=25,
        mpg_highway=32,
        drivetrain="RWD",
        carfax_rating=4.2,
        kelly_blue_rating=4.3,
        image="https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2024/gr-supra/3.0/040.png",
        available_trims=[
            TrimOption(trim="2.0", price=47000, msrp=47000,
                       drivetrain="RWD", mpg_city=25, mpg_highway=32),
            TrimOption(trim="3.0", price=57500, msrp=57500,
                       drivetrain="RWD", mpg_city=22, mpg_highway=30),
            TrimOption(trim="3.0 Premium", price=62000, msrp=62000,
                       drivetrain="RWD", mpg_city=22, mpg_highway=30),
        ],
        reviews=[]
    ),
    Vehicle(
        id=8,
        name="Toyota Tacoma",
        year=2025,
        model="Tacoma",
        trim="SR",
        price=31000,
        msrp=31000,
        seats=5,
        category="Truck",
        mpg_city=20,
        mpg_highway=23,
        drivetrain="4WD",
        carfax_rating=4.7,
        kelly_blue_rating=4.5,
        image="https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2024/tacoma/sr5/040.png",
        available_trims=[
            TrimOption(trim="SR", price=31000, msrp=31000,
                       drivetrain="4WD", mpg_city=20, mpg_highway=23),
            TrimOption(trim="SR5", price=35000, msrp=35000,
                       drivetrain="4WD", mpg_city=20, mpg_highway=23),
            TrimOption(trim="TRD Sport", price=40000, msrp=40000,
                       drivetrain="4WD", mpg_city=19, mpg_highway=22),
            TrimOption(trim="TRD Off-Road", price=42000, msrp=42000,
                       drivetrain="4WD", mpg_city=19, mpg_highway=22),
            TrimOption(trim="Limited", price=46000, msrp=46000,
                       drivetrain="4WD", mpg_city=19, mpg_highway=22),
            TrimOption(trim="TRD Pro", price=52000, msrp=52000,
                       drivetrain="4WD", mpg_city=18, mpg_highway=21),
        ],
        reviews=[]
    ),
    Vehicle(
        id=9,
        name="Toyota Sequoia",
        year=2025,
        model="Sequoia",
        trim="SR5",
        price=58000,
        msrp=58000,
        seats=8,
        category="SUV",
        mpg_city=19,
        mpg_highway=22,
        drivetrain="4WD",
        carfax_rating=4.7,
        kelly_blue_rating=4.6,
        image="",
        available_trims=[
            TrimOption(trim="SR5", price=58000, msrp=58000,
                       drivetrain="4WD", mpg_city=19, mpg_highway=22),
            TrimOption(trim="Limited", price=65000, msrp=65000,
                       drivetrain="4WD", mpg_city=19, mpg_highway=22),
            TrimOption(trim="Platinum", price=72000, msrp=72000,
                       drivetrain="4WD", mpg_city=18, mpg_highway=21),
            TrimOption(trim="Capstone", price=78000, msrp=78000,
                       drivetrain="4WD", mpg_city=18, mpg_highway=21),
        ],
        reviews=[]
    ),
    Vehicle(
        id=10,
        name="Toyota Avalon",
        year=2024,
        model="Avalon",
        trim="XLE",
        price=38000,
        msrp=38000,
        seats=5,
        category="Sedan",
        mpg_city=22,
        mpg_highway=31,
        drivetrain="FWD",
        carfax_rating=4.6,
        kelly_blue_rating=4.5,
        image="https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2024/avalon/xle/040.png",
        available_trims=[
            TrimOption(trim="XLE", price=38000, msrp=38000,
                       drivetrain="FWD", mpg_city=22, mpg_highway=31),
            TrimOption(trim="XSE", price=40000, msrp=40000,
                       drivetrain="FWD", mpg_city=22, mpg_highway=31),
            TrimOption(trim="Limited", price=43000, msrp=43000,
                       drivetrain="FWD", mpg_city=22, mpg_highway=31),
        ],
        reviews=[]
    )
]

# Get all vehicles with optional filters


@app.get("/api/vehicles")
def get_vehicles(budget: float = None, family_size: int = None, usage: str = None, hybrid: Optional[bool] = None):
    results = vehicles

    # Filter by budget
    if budget is not None:
        results = [v for v in results if v.price <= budget]

    # Filter by family size (minimum seats)
    if family_size is not None:
        results = [v for v in results if v.seats >= family_size]

    # Filter by usage type (category mapping)
    if usage:
        usage_category_map = {
            "work": ["Sedan", "Hybrid"],
            "family": ["SUV", "Minivan"],
            "travel": ["SUV", "Truck"],
            "daily": ["Sedan", "Hybrid"],
            "luxury": ["Sedan", "SUV"]
        }
        categories = usage_category_map.get(usage, [])
        if categories:
            results = [v for v in results if v.category in categories]

    # Filter by hybrid availability
    if hybrid is True:
        filtered = []
        for v in results:
            hybrid_trims = [t for t in v.available_trims if getattr(
                t, "is_hybrid", False)]
            if hybrid_trims:
                # Create a copy to avoid mutating original data
                v_copy = v.copy(deep=True)
                # Keep only hybrid trims
                v_copy.available_trims = hybrid_trims
                # Default top-level fields to the first hybrid trim for consistency
                first = hybrid_trims[0]
                v_copy.trim = first.trim
                v_copy.price = first.price
                v_copy.msrp = first.msrp
                v_copy.mpg_city = first.mpg_city
                v_copy.mpg_highway = first.mpg_highway
                v_copy.drivetrain = first.drivetrain
                filtered.append(v_copy)
        results = filtered

    return results

# Get vehicle by ID


@app.get("/api/vehicles/{vehicle_id}")
def get_vehicle(vehicle_id: int):
    vehicle = next((v for v in vehicles if v.id == vehicle_id), None)
    if vehicle:
        return vehicle
    raise HTTPException(status_code=404, detail="Vehicle not found")

# Add review to a vehicle


@app.post("/api/vehicles/{vehicle_id}/reviews")
def add_review(vehicle_id: int, review: Review):
    vehicle = next((v for v in vehicles if v.id == vehicle_id), None)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    vehicle.reviews.append(review)
    return {"message": "Review added", "vehicle": vehicle}

# Finance / lease calculation


@app.get("/api/vehicles/{vehicle_id}/finance")
def calculate_finance(vehicle_id: int, months: int = 60, rate: float = 5.0, lease: bool = False):
    vehicle = next((v for v in vehicles if v.id == vehicle_id), None)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    if lease:
        # Simple lease: monthly = price / months + 2% fee
        monthly = (vehicle.price / months) * 1.02
    else:
        # Finance: monthly = principal * (1 + rate/100) / months
        monthly = (vehicle.price * (1 + rate/100)) / months
    return {"monthly_payment": round(monthly, 2)}
