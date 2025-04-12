// NavBar.jsx
import { useDispatch, useSelector } from 'react-redux';
import { logoutFirebase } from '../store/slices/auth/thunks/Thunk';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    const dispatch = useDispatch();
    const { status, displayName } = useSelector(state => state.auth);
    
    const onLogout = () => {
        dispatch(logoutFirebase());
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Mi App</Link>
            </div>
            
            {status === 'authenticated' && (
                <div className="navbar-links">
                    <Link to="/crud">CRUD Firebase</Link>
                </div>
            )}
            
            <div className="navbar-user">
                {status === 'authenticated' ? (
                    <>
                        <span>Hola, {displayName || 'Usuario'}</span>
                        <button className="logout-btn" onClick={onLogout}>
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <span>No autenticado</span>
                )}
            </div>
        </nav>
    );
};