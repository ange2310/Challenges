import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar(){
    const {logout}=useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = ()=>{
        logout();
        navigate("/login");
    };
    
    return(
    <nav className="sidebar">
        <ul>
            <li><Link to="/Home" className="enlace">Home</Link></li>
            <li><Link to="/Perfil" className="enlace">Perfil</Link></li>
            <li><Link to="/Blogs" className="enlace">Mis Blogs</Link></li>
            <button className="enlace-cerrar" onClick={logout}>Cerrar Sesión</button>
        </ul>
    </nav>
    );
}
export default Sidebar;