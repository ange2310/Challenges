import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { login, logout } from './store/slices/auth/AuthSlice';
import { Navigate } from 'react-router-dom';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);

  useEffect(() => {
    // Configurar el listener para cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuario autenticado
        console.log("Usuario autenticado en App:", user.uid);
        dispatch(login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL
        }));
      } else {
        // Usuario no autenticado
        console.log("No hay usuario autenticado");
        dispatch(logout({ errorMessage: null }));
      }
    });

    // Limpiar el listener al desmontar
    return () => unsubscribe();
  }, [dispatch]);

  // Decidir redirección basada en el estado de autenticación
  if (status === 'authenticated') {
    return <Navigate to="/crud" />;
  }

  return <Navigate to="/login" />;
}

export default App;