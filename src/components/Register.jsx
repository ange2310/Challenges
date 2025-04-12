import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registerAuth } from '../store/slices/auth/thunks/Thunk';
import { useNavigate } from 'react-router-dom';

export const Registro = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, errorMessage } = useSelector(state => state.auth);
    
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });
    
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (status === 'authenticated') {
            navigate('/crud');
        }
    }, [status, navigate]);

    const onInputChange = (evt) => {
        const { name, value } = evt.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        
        // Validaciones básicas
        if (!formState.email.trim()) {
            setError("El correo electrónico es obligatorio");
            return;
        }
        
        if (!formState.password.trim()) {
            setError("La contraseña es obligatoria");
            return;
        }
        
        if (formState.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        
        try {
            console.log("Enviando datos de registro:", formState);
            await dispatch(registerAuth(formState.email, formState.password));
        } catch (error) {
            console.error("Error en registro:", error);
            setError(error.message || "Error al registrar. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="auth-form-container">
            <h1>Registro</h1>
            <hr />
            
            {error && <p className="error-message">{error}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            <form className="auth-form" onSubmit={onSubmit}>
                <input 
                    name='email' 
                    type='email' 
                    placeholder="Correo electrónico"
                    onChange={onInputChange} 
                    value={formState.email}
                    required
                />
                <input 
                    name='password' 
                    type='password' 
                    placeholder="Contraseña"
                    onChange={onInputChange} 
                    value={formState.password}
                    required
                />
                <button 
                    type='submit'
                    disabled={status === 'checking'}
                >
                    {status === 'checking' ? 'Procesando...' : 'Registrarse'}
                </button>
            </form>
            
            <div className="auth-switch">
                <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
            </div>
        </div>
    );
};