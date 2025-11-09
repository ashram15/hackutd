import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
    const { isAuthenticated, user } = useAuth0();
    const [favorites, setFavorites] = useState([]); // array of vehicle ids

    // Compute storage key per user
    const storageKey = useMemo(() => {
        if (!isAuthenticated || !user) return null;
        const uid = user.sub || user.email || "anonymous";
        return `favorites:${uid}`;
    }, [isAuthenticated, user]);

    // Load favorites when auth/user changes
    useEffect(() => {
        if (!storageKey) {
            setFavorites([]);
            return;
        }
        try {
            const raw = localStorage.getItem(storageKey);
            setFavorites(raw ? JSON.parse(raw) : []);
        } catch {
            setFavorites([]);
        }
    }, [storageKey]);

    // Persist on change
    useEffect(() => {
        if (!storageKey) return;
        try {
            localStorage.setItem(storageKey, JSON.stringify(favorites));
        } catch {
            // ignore
        }
    }, [favorites, storageKey]);

    const isFavorite = (id) => favorites.includes(id);
    const add = (id) => setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
    const remove = (id) => setFavorites((prev) => prev.filter((x) => x !== id));
    const toggle = (id) => (isFavorite(id) ? remove(id) : add(id));

    const value = useMemo(
        () => ({ favorites, count: favorites.length, isFavorite, add, remove, toggle, canFav: isAuthenticated }),
        [favorites, isAuthenticated]
    );

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
    return ctx;
}
