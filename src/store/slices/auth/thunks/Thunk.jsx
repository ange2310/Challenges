import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../../../../firebase/config";
import { register, login, logout, checkingCredentials } from "../AuthSlice";
//crea el usuario, actualiza, saca la data y esa data la envia para redux
export const registerAuth = (email, password) =>  {
    return async (dispatch) => {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        if (response){
            
            await updateProfile(auth.currentUser,{
                displayName: 'Angelica',
                photoURL: ''
            })

            const {email} = response.user 
            dispatch(register({email}))
        }else{
            throw new Error(dispatch(logout({ errorMessage: error.message })))
            
        }
    }
 }
 
 export const loginAuth = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        // console.log(email,password)
        const response = await signInWithEmailAndPassword(auth, email, password)
        if (response){
            const {email} = response.user 
            dispatch(login({email}))
        }else{
            throw new Error('login failed')
            
        }
    }
 }
 

export const loginWithGoogle = () => {
    return async (dispatch) => {
        try {
            const googleProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleProvider);
            const { uid, email, displayName, photoURL } = result.user;

            console.log("Dispatching login action with:", { uid, email, displayName, photoURL });
            
            dispatch(login({
                uid,
                email,
                displayName,
                photoURL
            }));
        } catch (error) {
            console.error("Error en login con Google:", error);
            dispatch(logout({ errorMessage: error.message }));
        }
    };
};

export const logoutFirebase = () => {
    return async (dispatch) => {
        try {
            await signOut(auth);
            dispatch(logout());
        } catch (error) {
            dispatch(logout({ errorMessage: error.message }));
        }
    };
};