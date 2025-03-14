import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Home.css";

function Home() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const blogs = [
        { id: 1, title: "Explorando React", author: "Juan Pérez", descripcion: "React es una biblioteca de JavaScript utilizada para construir interfaces de usuario dinámicas y eficientes. Su enfoque basado en componentes facilita el desarrollo y la reutilización de código." },
        { id: 2, title: "Guía de UI/UX", author: "María López", descripcion:"El diseño UI/UX se enfoca en mejorar la experiencia del usuario a través de interfaces intuitivas y atractivas." },
        { id: 3, title: "Introducción a TypeScript", author: "Carlos Méndez", descripcion:"TypeScript es un superset de JavaScript que añade tipado estático y otras características avanzadas." }
    ];

    return (
        <div className="home-container">
            <Sidebar />
            <div className="main-content">
                <nav className="welcomebar">
                    <h1 className="welcome-text">Bienvenido, {user ? user.name : "Usuario"}👋🏼</h1>
                </nav>
                <p className="subtitle">Explora los últimos blogs de la comunidad:</p>
                <div className="blog-grid">
                    {blogs.map(blog => (
                        <div key={blog.id} className="blog-card">
                            <h3>{blog.title}</h3>
                            <p><strong>Autor:</strong> {blog.author}</p>
                            <span className="descripcion">Descripción: {blog.descripcion}</span>
                        </div>
                    ))}
                </div>
                <div className="button-group">
                </div>
            </div>
        </div>
    );
    
}

export default Home;
