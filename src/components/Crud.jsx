import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useCollection from '../firebase/FireStoresService';
import { auth } from '../firebase/config';

export const Crud = () => {
  const [user, setUser] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const { status } = useSelector(state => state.auth);
  const { add, getAll, update, remove, isPending, results } = useCollection('users');
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Mostrar mensaje temporal
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };
  
  // Cargar todos los documentos
  const getAllDocs = async () => {
    console.log("Intentando cargar usuarios...");
    try {
      await getAll();
      console.log("Usuarios cargados:", results.length);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      showMessage("Error al cargar usuarios: " + error.message, 'error');
    }
  };
  
  // Guardar o actualizar usuario
  const save = async () => {
    if (!auth.currentUser) {
      showMessage("Debes estar autenticado para realizar esta acción", 'error');
      return;
    }
    
    if (!user.name.trim()) {
      showMessage("El nombre no puede estar vacío", 'error');
      return;
    }
    
    // Crear un objeto simple para enviar a la base de datos
    const userData = {
      name: user.name.trim(),
      createdBy: auth.currentUser.uid,
      timestamp: new Date().toISOString()
    };
    
    try {
      if (editingId) {
        console.log("Actualizando usuario:", editingId);
        await update(editingId, userData);
        showMessage("Usuario actualizado con éxito");
      } else {
        console.log("Creando nuevo usuario:", userData);
        const result = await add(userData);
        console.log("Resultado de agregar:", result);
        if (result) {
          showMessage("Usuario creado con éxito");
        }
      }
      
      setUser({ name: '' });
      setEditingId(null);
      await getAllDocs();
    } catch (error) {
      console.error("Error al guardar:", error);
      showMessage(`Error al guardar: ${error.message || "Error desconocido"}`, 'error');
    }
  };
  
  // Manejar cambio en el input
  const handleSetUser = (event) => {
    setUser({ name: event.target.value });
  };
  
  // Preparar para editar
  const handleEdit = (item) => {
    console.log("Preparando para editar usuario:", item.id);
    setUser({ name: item.name || '' });
    setEditingId(item.id);
  };
  
  // Eliminar usuario
  const handleDelete = async (id) => {
    if (!auth.currentUser) {
      showMessage("Debes estar autenticado para realizar esta acción", 'error');
      return;
    }
    
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        console.log("Intentando eliminar usuario con ID:", id);
        const success = await remove(id);
        
        if (success) {
          console.log("Usuario eliminado con éxito");
          showMessage("Usuario eliminado con éxito");
          await getAllDocs();
        } else {
          console.error("No se pudo eliminar el usuario");
          showMessage("Error al eliminar el usuario", 'error');
        }
      } catch (error) {
        console.error("Error en la eliminación:", error);
        showMessage("Error al eliminar: " + error.message, 'error');
      }
    }
  };
  
  // Cargar usuarios al iniciar
  useEffect(() => {
    if (status === 'authenticated') {
      getAllDocs();
    }
  }, [status]);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Usuarios</h2>
      
      {message.text && (
        <div className={message.type === 'error' ? 'error-message' : 'success-message'} 
             style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px',
                      backgroundColor: message.type === 'error' ? '#ffebee' : '#e8f5e9',
                      color: message.type === 'error' ? '#c62828' : '#2e7d32' }}>
          {message.text}
        </div>
      )}
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          onChange={handleSetUser} 
          value={user.name} 
          placeholder="Nombre del usuario"
          disabled={isPending}
        />
        <button 
          type="button" 
          onClick={save} 
          disabled={isPending}
          style={{
            opacity: isPending ? 0.7 : 1,
            cursor: isPending ? 'not-allowed' : 'pointer'
          }}
        >
          {isPending ? 'Procesando...' : (editingId ? 'Actualizar' : 'Guardar')}
        </button>
        {editingId && !isPending && (
          <button type="button" onClick={() => {
            setUser({ name: '' });
            setEditingId(null);
          }}>
            Cancelar
          </button>
        )}
      </div>
      
      {isPending && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '15px',
          backgroundColor: '#e3f2fd', 
          color: '#0d47a1',
          borderRadius: '4px'
        }}>
          Procesando solicitud...
        </div>
      )}
      
      <ul>
        {results.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
            <div>
              <button onClick={() => handleEdit(item)} disabled={isPending}>Editar</button>
              <button onClick={() => handleDelete(item.id)} disabled={isPending}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      
      {results.length === 0 && !isPending && (
        <p>No hay usuarios para mostrar.</p>
      )}
    </div>
  );
};