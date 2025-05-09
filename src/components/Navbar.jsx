import { useDispatch, useSelector } from 'react-redux';
import { logoutFirebase } from '../store/slices/auth/thunks/Thunk';
import { Link } from 'react-router-dom';


export const NavBar = () => {
    const dispatch = useDispatch();
    const { status, displayName, photoURL } = useSelector(state => state.auth);
    
    const onLogout = () => {
        console.log("Cerrando sesión desde NavBar");
        dispatch(logoutFirebase());
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Mi App Firebase</Link>
            </div>
            
            {status === 'authenticated' && (
                <div className="navbar-links">
                    <Link to="/crud">CRUD Firebase</Link>
                    <Link to="/chat">Chat</Link>
                </div>
            )}
            
            <div className="navbar-user">
                {status === 'authenticated' ? (
                    <>
                        {photoURL && (
                            <img 
                                src={photoURL} 
                                alt="Avatar"
                                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                            />
                        )}
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