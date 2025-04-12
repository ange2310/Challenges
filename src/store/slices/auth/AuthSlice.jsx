import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', 
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        register: (state, action) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.errorMessage = null;
            console.log('¡Registro exitoso!', action.payload);
        },
        login: (state, action) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.errorMessage = null;
            console.log('¡Login exitoso!', action.payload);
        },
        logout: (state, action) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = action.payload?.errorMessage || null;
            console.log('Se ha cerrado la sesión');
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
            state.errorMessage = null;
            console.log('Verificando credenciales...');
        }
    }
});

export const { login, logout, checkingCredentials, register } = authSlice.actions;