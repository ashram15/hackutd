import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import BrowsePage from "./pages/BrowsePage";
import BuildPage from "./pages/BuildPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/build" element={<BuildPage />} />
            </Routes>
        </Router>
    );
}
