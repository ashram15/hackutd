# Car Catcher - HackUTD Project

<italic>Customize your dream car, find what catches your vibe!</italic>

A comprehensive web application for shopping Toyota vehicles with advanced filtering, user authentication, favorites management, reviews, and financing calculations.

## Features

### Authentication & User Features
- **Auth0 Integration**: Secure login/logout with social auth support
- **User Profiles**: Display authenticated user info and avatar in header
- **Favorites System**: 
  - Heart/unfavorite vehicles when logged in
  - Persistent per-user favorites (localStorage)
  - Dedicated Favorites page with count badge
  - Remove favorites functionality
- **Protected Actions**: Review submission requires authentication

### Vehicle Discovery
- **Browse Page**: 
  - Vehicles organized by category (Cars & Minivans, SUV, Trucks, Electric & Hybrid)
  - View counts per category
  - Quick "View Details" modal
  - Heart toggle on each card (when logged in)
- **Search Page**: Advanced search with filters and detailed vehicle cards
- **Build Page**: (Future: Vehicle customization)

### Advanced Filtering
- **Budget Indicator**: Interactive slider to set and visualize your budget range
- **Filters**: 
  - Family size (number of seats needed)
  - Usage type (Work, Family, Travel, Daily, Luxury)
  - Hybrid-only toggle (filters Camry, Sienna, Highlander Hybrid)
  - Real-time budget filtering
- **Trim Selection**: Switch between available trims with dynamic pricing and MPG updates

### Ratings & Reviews
- **Vehicle Ratings**: Display Carfax and Kelly Blue Book ratings
- **User Reviews**: 
  - Read reviews with ratings and comments
  - Submit reviews (login required)
  - Average rating display

### Payment Calculator
- **Finance vs Lease options**
- **Adjustable parameters**:
  - Down payment slider
  - Term length (12-84 months)
  - Interest rate
- **Real-time payment estimation**
- **Toggle visibility** per vehicle

### UI/UX
- **Responsive Design**: Tailwind CSS with mobile-first approach
- **Global Navigation**: Sticky header with route highlighting
- **Image Optimization**: object-contain for consistent card layouts
- **Category Organization**: Smart grouping with flexible matching

## Tech Stack 

### Backend
- **FastAPI** (Python) - High-performance async API framework
- **Pydantic** - Data validation and serialization
- **CORS** enabled for frontend communication

### Frontend
- **React** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing (Search, Browse, Build, Favorites)
- **Tailwind CSS** - Utility-first styling
- **Auth0 React SDK** - Authentication and user management
- **Context API** - Global favorites state management

## Setup Instructions 

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

3. **Configure environment variables**:
   - Copy or create `frontend/.env` with:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   ```
   - Replace Auth0 placeholders with your actual Auth0 application credentials

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Auth0 Setup (Required for Login/Favorites)

1. Create a free Auth0 account at [auth0.com](https://auth0.com)
2. Create a new "Single Page Application"
3. Configure Allowed Callback URLs: `http://localhost:5173`
4. Configure Allowed Logout URLs: `http://localhost:5173`
5. Copy your Domain and Client ID to `frontend/.env`

### Using Docker (Optional)

```bash
docker-compose up
```

## API Endpoints 📡

### Vehicles
- `GET /api/vehicles` - Get all vehicles with optional filters
  - Query params: `budget`, `family_size`, `usage`, `hybrid`
- `GET /api/vehicles/{id}` - Get specific vehicle details

### Reviews
- `POST /api/vehicles/{id}/reviews` - Add a review to a vehicle
  - Body: `{ "user_name": string, "rating": int, "comment": string }`

### Finance
- `GET /api/vehicles/{id}/finance` - Calculate finance/lease payments
  - Query params: `months`, `rate`, `lease`

## Filter Parameters

- **budget**: Maximum price (e.g., `30000`)
- **family_size**: Minimum number of seats (e.g., `7`)
- **usage**: Vehicle usage type (`work`, `family`, `travel`, `daily`, `luxury`)
- **hybrid**: Boolean flag to filter hybrid-only vehicles (`true`)

## Project Structure

```
hackutd/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app with all endpoints & vehicle data
│   │   ├── models.py        # Pydantic models (Vehicle, Review, TrimOption)
│   │   ├── db.py           # Database configuration (optional)
│   │   └── seed_data.py    # Initial data seeding (optional)
│   └── requirements.txt
│
└── frontend/
    ├── .env                 # Environment variables (Auth0, API URL)
    ├── src/
    │   ├── components/
    │   │   ├── VehicleCard.jsx        # Vehicle display with ratings & heart toggle
    │   │   ├── PaymentCalculator.jsx  # Finance/lease calculator
    │   │   ├── BudgetIndicator.jsx    # Budget slider
    │   │   ├── FiltersPanel.jsx       # Advanced filters + hybrid toggle
    │   │   ├── ReviewForm.jsx         # Review submission (auth required)
    │   │   ├── TrimSelector.jsx       # Trim selection with dynamic pricing
    │   │   ├── LoginButton.jsx        # Auth0 login trigger
    │   │   └── LogoutButton.jsx       # Auth0 logout trigger
    │   ├── context/
    │   │   └── FavoritesContext.jsx   # Global favorites state (localStorage)
    │   ├── pages/
    │   │   ├── SearchPage.jsx         # Advanced search with filters
    │   │   ├── BrowsePage.jsx         # Category-grouped vehicle gallery
    │   │   ├── FavoritesPage.jsx      # User favorites list (auth required)
    │   │   └── BuildPage.jsx          # Vehicle customization (future)
    │   ├── App.jsx           # Main app with Auth0Provider & routing
    │   ├── api.js           # API utility functions
    │   ├── main.jsx         # React entry point with Auth0 setup
    │   └── index.css        # Tailwind imports
    └── package.json
```

## Hackathon Features Implemented 

### Core Functionality
1. Search and filter Toyota vehicles with real-time updates
2. Compare vehicles by price, seats, ratings, MPG, drivetrain
3. Budget indicator with visual feedback
4. Family size filtering (minimum seats)
5. Usage-based recommendations (Work, Family, Travel, Daily, Luxury)
6. Hybrid-only filtering (Camry, Sienna, Highlander Hybrid)
7. Dynamic trim selection with price/MPG updates

### Authentication & Personalization
8. Auth0 integration (login/logout with social auth)
9. User profile display in header
10. Favorites system (heart/unfavorite vehicles)
11. Persistent per-user favorites (localStorage)
12. Protected review submission (login required)
13. Dedicated Favorites page with count badge

### Data & Display
14. Carfax and Kelly Blue Book ratings display
15. User review system with star ratings
16. 10+ Toyota models with detailed specs
17. Multiple trims per vehicle with unique pricing
18. Category-organized Browse page (Cars & Minivans, SUV, Trucks, Electric & Hybrid)

### Finance & Calculations
19. Finance and lease payment calculator
20. Adjustable down payment, term, and interest rate
21. Toggle payment calculator visibility

### UX & Design
22. Responsive design with Tailwind CSS
23. Client-side routing (React Router)
24. Modal for quick vehicle details
25. Image optimization (object-contain)
26. Sticky header navigation with active route highlighting

## Future Enhancements 

- Server-side favorites sync (API endpoints)
- Build page for vehicle customization
- Comparison tool (side-by-side vehicles)
- Enhanced filtering (color, year range)
- Test drive scheduling
- Dealer locator integration
- 360° vehicle image viewer

Built for HackUTD 2025

