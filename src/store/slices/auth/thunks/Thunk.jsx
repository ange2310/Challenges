import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../../firebase/config"; 
import { login, logout, checkingCredentials } from "../AuthSlice";

// Registro de usuario con email y password
export const registerAuth = (email, password) => {
    return async (dispatch) => {
        try {
            console.log("Iniciando registro con:", email);
            dispatch(checkingCredentials());
            
            // Crear el usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;
            
            if (!user) {
                throw new Error("No se pudo completar el registro");
            }
            
            // Configurar el displayName inicial (puede ser el email sin el dominio)
            const displayName = email.split('@')[0];
            await updateProfile(user, {
                displayName: displayName,
                photoURL: ''
            });
            
            console.log("Usuario registrado exitosamente:", user.uid);
            
            dispatch(login({
                uid: user.uid,
                email: user.email,
                displayName: displayName,
                photoURL: user.photoURL
            }));
            
            return { success: true };
        } catch (error) {
            console.error("Error en el registro:", error.message);
            let errorMessage = "Error al registrar usuario";
            
            // Mapear mensajes de error de Firebase
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Este correo ya está registrado";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Correo electrónico inválido";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "La contraseña es demasiado débil";
            }
            
            dispatch(logout({ errorMessage }));
            throw new Error(errorMessage);
        }
    };
};

// Login con email y password
export const loginAuth = (email, password) => {
    return async (dispatch) => {
        try {
            console.log("Iniciando login:", email);
            dispatch(checkingCredentials());
            
            const result = await signInWithEmailAndPassword(auth, email, password);
            const { uid, displayName, photoURL } = result.user;
            
            console.log("Login exitoso:", uid);
            
            dispatch(login({
                uid,
                email,
                displayName: displayName || email.split('@')[0],
                photoURL
            }));
            
            return { success: true };
        } catch (error) {
            console.error("Error en login:", error.message);
            let errorMessage = "Error al iniciar sesión";
            
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = "Credenciales incorrectas";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "Demasiados intentos fallidos. Intenta más tarde";
            }
            
            dispatch(logout({ errorMessage }));
            throw new Error(errorMessage);
        }
    };
};

// Login con Google
export const loginWithGoogle = () => {
    return async (dispatch) => {
        try {
            console.log("Iniciando login con Google");
            dispatch(checkingCredentials());
            
            const googleProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleProvider);
            
            const { uid, email, displayName, photoURL } = result.user;
            console.log("Login con Google exitoso:", uid);
            
            dispatch(login({
                uid,
                email,
                displayName,
                photoURL
            }));
            
            return { success: true };
        } catch (error) {
            console.error("Error en login con Google:", error);
            const errorMessage = "Error al iniciar sesión con Google";
            dispatch(logout({ errorMessage }));
            throw new Error(errorMessage);
        }
    };
};

// Cerrar sesión
export const logoutFirebase = () => {
    return async (dispatch) => {
        try {
            console.log("Cerrando sesión...");
            await signOut(auth);
            console.log("Sesión cerrada exitosamente");
            dispatch(logout({ errorMessage: null }));
            return { success: true };
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            dispatch(logout({ errorMessage: "Error al cerrar sesión" }));
            throw error;
        }
    };
};
