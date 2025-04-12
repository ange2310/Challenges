import {createSlice} from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name:'auth',
    initialState:{
        status: 'checking',
        uid: null,
        email: null,
        displayName: null,
        photoUrl:null,
        errorMessage: null
    },
    reducers:{
        register: (state, action)=>{
            state.email = action.payload.email
        },
        login: (state, action)=>{
            state.status = 'authenticated'
            state.email = action.payload.email
            state.displayName = action.payload.displayName
            console.log('¡Login exitoso!', action.payload);
        },
        logout : (state,action) => {
            state.status = 'not-authenticated'
            state.email = null
            state.displayName = null
            state.errorMessage = action.payload.errorMessage
            console.log('Se ha cerrado la sesión correctamente', action.payload);
        },
        checkingCredentials: (state,action)=>{
            console.log('checking')
        }
    }
})

export const {login,logout,checkingCredentials,register} = authSlice.actions