import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Registro } from './components/Register.jsx'
import { Login } from './components/Login.jsx'
import { NavBar } from './components/Navbar.jsx'
import { Crud } from './components/Crud.jsx'
import { Provider } from 'react-redux'
import { store } from './store/Store.jsx'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'

// Componente Layout que incluye la NavBar
const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet /> {/* Aquí se renderizarán los componentes hijos de las rutas */}
    </>
  )
}

// Componente para rutas protegidas
const PrivateRoute = () => {
  const { status } = store.getState().auth;
  
  if (status === 'authenticated') {
    return <Outlet />;
  }
  
  return <Navigate to="/login" />;
};

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          
          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/crud" element={<Crud />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)