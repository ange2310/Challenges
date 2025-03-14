import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        usuario: "",
        contrasena: ""
    });

    const [errores, setErrores] = useState({});
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const validarCampos = () => {
        let erroresTemp = {};
        if (!user.usuario) erroresTemp.usuario = "El usuario es obligatorio";
        if (!user.contrasena) erroresTemp.contrasena = "La contraseña es obligatoria";
        setErrores(erroresTemp);
        return Object.keys(erroresTemp).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarCampos()) return;

        if (user.usuario === "ange" && user.contrasena === "123") {
            console.log(`Usuario Correcto, bienvenido ${user.usuario}`);
            login({ name: user.usuario });
            navigate("/Home");
        } else {
            console.log("El usuario o contraseña no son válidos");
            setErrores({ general: "Usuario o contraseña incorrectos" });
        }
    };

    return (
        <div className="contenedor-login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="campo">
                    <input 
                        type="text" 
                        name="usuario" 
                        placeholder="Usuario" 
                        onChange={handleChange} 
                    />
                    {errores.usuario && <p className="error">{errores.usuario}</p>}
                </div>

                <div className="campo">
                    <input 
                        type={mostrarContrasena ? "text" : "password"} 
                        name="contrasena" 
                        placeholder="Contraseña" 
                        onChange={handleChange} 
                    />
                    <button 
                        type="button" 
                        className="toggle-password" 
                        onClick={() => setMostrarContrasena(!mostrarContrasena)}
                    >
                        {mostrarContrasena ? "👁️" : "🙈"}
                    </button>
                    {errores.contrasena && <p className="error">{errores.contrasena}</p>}
                </div>

                {errores.general && <p className="error error-general">{errores.general}</p>}

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;
