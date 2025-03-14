import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Perfil from "./pages/Perfil";
import PrivateRoute from "./components/PrivateRoute";

export const App = () => {
  return (
    <Routes>
      {/* Redirección automática al login si el usuario entra a la raíz */}
      <Route path="/" element={<Navigate to="/Login" />} />

      {/* Rutas Públicas */}
      <Route path="/Login" element={<Login />} />

      {/* Rutas Privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/Home" element={<Home />} />
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/Perfil" element={<Perfil />} />
      </Route>
    </Routes>
  );
};

export default App;
