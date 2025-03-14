import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // ✅ Nombre corregido

    const login = (datoUsuario) => {
        setUser(datoUsuario); // Guarda el usuario en el estado al iniciar sesión
    };

    const logout = () => {
        setUser(null); // Borra el usuario al cerrar sesión
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
