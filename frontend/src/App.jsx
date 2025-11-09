import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchPage from "./pages/SearchPage";
import BrowsePage from "./pages/BrowsePage";
import BuildPage from "./pages/BuildPage";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import FavoritesPage from "./pages/FavoritesPage";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";

function HeaderNav() {
    const { isAuthenticated, user, isLoading } = useAuth0();
    const { count } = useFavorites();

    return (
        <header className="bg-white shadow sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-red-600" style={{ fontFamily: 'Shrikhand, cursive' }}>CarCatcher</Link>
                <nav className="flex items-center gap-6">
                    <NavLink to="/" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`} style={{ fontFamily: 'Montserrat, cursive' }}>Search</NavLink>
                    <NavLink to="/browse" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`} style={{ fontFamily: 'Montserrat, cursive' }}>Browse</NavLink>
                    <NavLink to="/build" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`} style={{ fontFamily: 'Montserrat, cursive' }}>Build</NavLink>
                    {isAuthenticated && (
                        <NavLink to="/favorites" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`} style={{ fontFamily: 'Montserrat, cursive' }}>
                            Favorites {count > 0 && <span className="ml-1 inline-flex items-center justify-center text-xs bg-red-600 text-white rounded-full h-5 min-w-[1.25rem] px-1">{count}</span>}
                        </NavLink>
                    )}
                </nav>
                <div className="flex items-center gap-4">
                    {isLoading ? (
                        <span className="text-xs text-gray-500">Loading...</span>
                    ) : isAuthenticated ? (
                        <>
                            {user?.picture && (
                                <img src={user.picture} alt={user.name} className="h-8 w-8 rounded-full border" />
                            )}
                            <span className="text-sm font-medium text-gray-700 max-w-[140px] truncate" title={user?.name}>{user?.name}</span>
                            <LogoutButton />
                        </>
                    ) : (
                        <LoginButton />
                    )}
                </div>
            </div>
        </header>
    );
}

export default function App() {
    return (
        <Router>
            <FavoritesProvider>
                <HeaderNav />
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/browse" element={<BrowsePage />} />
                    <Route path="/build" element={<BuildPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
            </FavoritesProvider>
        </Router>
    );
}
