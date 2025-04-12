import { useState } from "react";
import {useDispatch} from 'react-redux'
import { registerAuth } from '../store/slices/auth/thunks/Thunk';

export const Registro = () => {
    const dispatch =  useDispatch()
    const [formState, setFormState] = useState({
        email: 'angelica.marcillo@uao.edu.co',
        password: '123456'
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
        dispatch(registerAuth(formState.email, formState.password));
    }
    return(
        <div className="auth-form-container">
            <h1>Registro</h1>
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
                <button type='submit'>Registrarse</button>
            </form>
            <div className="auth-switch">
                <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
            </div>
        </div>
    )
}