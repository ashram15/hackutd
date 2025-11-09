# Add initial reviews and ratings for cars
from .db import SessionLocal, engine, Base
from .models import Vehicle

Base.metadata.create_all(bind=engine)
db = SessionLocal()

cars = [
    Vehicle(model="Camry", year=2025, trim="SE", msrp=28995, mpg_city=28, mpg_highway=39, drivetrain="FWD",
            horsepower=206, features={"apple_carplay": True}, image="https://toyota.com/camry.jpg"),
    Vehicle(model="Corolla", year=2025, trim="LE", msrp=21495, mpg_city=30, mpg_highway=38, drivetrain="FWD",
            horsepower=139, features={"android_auto": True}, image="https://toyota.com/corolla.jpg"),
    Vehicle(model="RAV4", year=2025, trim="XLE", msrp=30995, mpg_city=27, mpg_highway=35, drivetrain="AWD",
            horsepower=203, features={"sunroof": True}, image="https://toyota.com/rav4.jpg")
]

for car in cars:
    db.add(car)

db.commit()
print("✅ Seeded vehicle data")
