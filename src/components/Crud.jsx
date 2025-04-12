import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useCollection from '../firebase/FireStoresService'
import { auth } from '../firebase/config'  

export const Crud = () => {
  const [user, setUser] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { add, getAll, update, remove, isPending, results } = useCollection('users');
  
  const getAllDocs = async () => {
    console.log("Intentando cargar usuarios...");
    try {
      await getAll();
      console.log("Usuarios cargados:", results.length);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  }
  
  const save = async () => {
  if (!auth.currentUser) {
    alert("Debes estar autenticado para realizar esta acción");
    return;
  }
  
  const userData = {
    ...user,
    createdBy: auth.currentUser.uid,
    createdAt: new Date().toISOString()
  };
  
  if (editingId) {
    await update(editingId, userData);
  } else {
    await add(userData);
  }
  
  setUser({ name: '' });
  setEditingId(null);
  await getAllDocs();
};

  
  const handleSetUser = (event) => {
    setUser({ name: event.target.value });
  }
  
  const handleEdit = (item) => {
    console.log("Preparando para editar usuario:", item.id);
    setUser({ name: item.name });
    setEditingId(item.id); 
  }
  
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        console.log("Intentando eliminar usuario con ID:", id);
        
        // Llamar a la función remove
        const success = await remove(id);
        
        if (success) {
          console.log("Usuario eliminado con éxito, actualizando lista...");
          
          await getAllDocs();
        } else {
          console.error("No se pudo eliminar el usuario");
          alert("Error al eliminar el usuario");
        }
      } catch (error) {
        console.error("Error en la eliminación:", error);
        alert("Error al eliminar: " + error.message);
      }
    }
  };
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("Usuario autenticado:", user.uid);
        console.log("Cargando usuarios para el usuario autenticado...");
        getAllDocs();
      } else {
        console.log("Usuario no autenticado");
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  return (
    <>
      <input type="text" onChange={handleSetUser} value={user.name} />
      <button type="button" onClick={save}>
        {editingId ? 'Actualizar' : 'Guardar'}
      </button>
      {editingId && (
        <button type="button" onClick={() => {
          setUser({ name: '' });
          setEditingId(null);
        }}>
          Cancelar
        </button>
      )}
      
      {isPending ? <span>Saving...</span> : ""}
      <ul>
        {results.map((item) => {
          return (
            <li key={item.id}>
              {JSON.stringify(item)}
              <button onClick={() => handleEdit(item)}>Editar</button>
              <button onClick={() => handleDelete(item.id)}>Eliminar</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}