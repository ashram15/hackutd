from sqlalchemy import Column, Integer, String, Float, JSON
from .db import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    make = Column(String, default="Toyota")
    model = Column(String)
    year = Column(Integer)
    trim = Column(String)
    msrp = Column(Float)
    mpg_city = Column(Integer)
    mpg_highway = Column(Integer)
    drivetrain = Column(String)
    horsepower = Column(Integer)
    features = Column(JSON)
    image = Column(String)
