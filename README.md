# Toyota Car Finder - HackUTD Project

A comprehensive web application for shopping Toyota vehicles with advanced filtering, reviews, and financing calculations.

## Features ✨

- **Budget Indicator**: Interactive slider to set and visualize your budget range
- **Advanced Filters**: 
  - Family size (number of seats needed)
  - Usage type (Work, Family, Travel, Daily, Luxury)
  - Real-time budget filtering
- **Vehicle Ratings**: Display Carfax and Kelly Blue Book ratings
- **User Reviews**: Read and submit reviews for vehicles
- **Payment Calculator**: 
  - Finance vs Lease options
  - Adjustable down payment, term length, and interest rate
  - Real-time payment estimation
- **Comprehensive Vehicle Data**: 10+ Toyota models with detailed specs

## Tech Stack 🛠️

### Backend
- FastAPI (Python)
- PostgreSQL (optional, SQLAlchemy ORM ready)
- CORS enabled for frontend communication

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios for API calls

## Setup Instructions 🚀

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the FastAPI server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Using Docker (Optional)

```bash
docker-compose up
```

## API Endpoints 📡

- `GET /api/vehicles` - Get all vehicles with optional filters (budget, family_size, usage)
- `GET /api/vehicles/{id}` - Get specific vehicle details
- `POST /api/vehicles/{id}/reviews` - Add a review to a vehicle
- `GET /api/vehicles/{id}/finance` - Calculate finance/lease payments

## Filter Parameters

- **budget**: Maximum price (e.g., `30000`)
- **family_size**: Minimum number of seats (e.g., `7`)
- **usage**: Vehicle usage type (`work`, `family`, `travel`, `daily`, `luxury`)

## Project Structure 📁

```
hackutd/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app with all endpoints
│   │   ├── models.py        # Database models
│   │   ├── db.py           # Database configuration
│   │   └── seed_data.py    # Initial data seeding
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── VehicleCard.jsx        # Vehicle display with ratings
    │   │   ├── PaymentCalculator.jsx  # Finance/lease calculator
    │   │   ├── BudgetIndicator.jsx    # Budget slider
    │   │   ├── FiltersPanel.jsx       # Advanced filters
    │   │   └── ReviewForm.jsx         # Review submission
    │   ├── App.jsx           # Main app component
    │   ├── api.js           # API utility functions
    │   └── main.jsx         # React entry point
    └── package.json
```

## Hackathon Features Implemented ✅

1. ✅ Search and filter Toyota vehicles
2. ✅ Compare vehicles by price, seats, ratings
3. ✅ Budget indicator with visual feedback
4. ✅ Family size filtering
5. ✅ Usage-based recommendations (Work, Kids, Travel, etc.)
6. ✅ Carfax and Kelly Blue Book ratings display
7. ✅ User review system
8. ✅ Finance and lease payment calculator
9. ✅ Responsive design with Tailwind CSS
10. ✅ Real-time filtering and search

## Contributors 👥

Built for HackUTD 2025

