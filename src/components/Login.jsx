import { useState } from "react";
import {useDispatch} from 'react-redux'
import { loginAuth, loginWithGoogle } from '../store/slices/auth/thunks/Thunk';

export const Login = () => {
    const dispatch =  useDispatch()
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    })

    const onInputChange = (evt) =>{
        const {name,value}= evt.target;
        setFormState({
            ...formState,
            [name]:value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(formState)
        dispatch(loginAuth(formState.email, formState.password));
    }

    const onGoogleLogin = () => {
        dispatch(loginWithGoogle());
    };
    return(
        <div className="auth-form-container">
            <h1>Login</h1>
            <hr/>
            <form className="auth-form" onSubmit={(event)=>onSubmit(event)}>
                <input 
                    name='email' 
                    type='email' 
                    placeholder="Correo electrónico"
                    onChange={(event)=> onInputChange(event)} 
                    value={formState.email}
                />
                <input 
                    name='password' 
                    type='password' 
                    placeholder="Contraseña"
                    onChange={(event)=>onInputChange(event)} 
                    value={formState.password}
                />
                <button type='submit'>Iniciar Sesión</button>
            </form>
            <button className="google-btn" onClick={onGoogleLogin}>Login con Google</button>
            <div className="auth-switch">
                <p>¿No tienes cuenta? <a href="/registro">Regístrate</a></p>
            </div>
        </div>
    )
}