import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/Store.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { Registro } from './components/Register.jsx';
import { Login } from './components/Login.jsx';
import { NavBar } from './components/Navbar.jsx';
import { Crud } from './components/Crud.jsx';
import { Chat } from './components/Chat.jsx'; 

//
function ProtectedRoute({ children }) {
  const { status } = store.getState().auth;
  
  if (status === 'checking') {
    return <div>Cargando...</div>;
  }
  
  if (status !== 'authenticated') {
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}


function PublicLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          
          <Route 
            path="/login" 
            element={
              <PublicLayout>
                <Login />
              </PublicLayout>
            } 
          />
          
          <Route 
            path="/registro" 
            element={
              <PublicLayout>
                <Registro />
              </PublicLayout>
            } 
          />

          <Route 
            path="/crud" 
            element={
              <ProtectedRoute>
                <Crud />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);