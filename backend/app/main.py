from fastapi import FastAPI, Depends, Query
from sqlalchemy.orm import Session
from .db import SessionLocal, engine, Base
from .models import Vehicle
import math

app = FastAPI(title="Toyota Car Finder")

# create tables
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/vehicles")
def get_vehicles(q: str | None = None, db: Session = Depends(get_db)):
    query = db.query(Vehicle)
    if q:
        query = query.filter(Vehicle.model.ilike(f"%{q}%"))
    return query.limit(20).all()


@app.get("/vehicles/{vehicle_id}")
def get_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    return db.query(Vehicle).get(vehicle_id)


@app.get("/calculate/finance")
def calc_finance(price: float, down: float = 0, apr: float = 4.5, months: int = 60):
    loan_amount = price - down
    r = apr / 100 / 12
    if r == 0:
        payment = loan_amount / months
    else:
        payment = loan_amount * r / (1 - (1 + r) ** -months)
    return {"monthly": round(payment, 2), "loan_amount": round(loan_amount, 2)}
