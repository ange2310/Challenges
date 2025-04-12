import { db, auth } from "../firebase/config";
import { ref, set, get, update as updateDB, remove as removeDB, push } from "firebase/database";
import { useState } from "react";

const useCollection = (table) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // Obtener todos los documentos
  const getAll = async () => {
    setIsPending(true);
    setError(null);
    
    try {
      const dbRef = ref(db, table);
      const snapshot = await get(dbRef);
      
      let newResults = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Convertir el objeto en un array con IDs
        Object.keys(data).forEach((key) => {
          newResults.push({
            ...data[key],
            id: key
          });
        });
      }
      
      console.log(`Cargados ${newResults.length} documentos de ${table}`);
      setResults(newResults);
      setIsPending(false);
      return newResults;
    } catch (error) {
      console.error("Error obteniendo documentos:", error);
      setError("No se pudieron cargar los datos");
      setIsPending(false);
      throw error;
    }
  };

  // Añadir un nuevo documento
  const add = async (data) => {
    setError(null);
    setIsPending(true);
    
    try {
      console.log("Intentando guardar documento:", data);
      console.log("En colección:", table);
      
      // Generar una nueva referencia con ID único
      const newItemRef = push(ref(db, table));
      
      const sanitizedData = { ...data };
      // Asegurar que createdAt sea string si es un objeto Date
      if (sanitizedData.createdAt instanceof Date) {
        sanitizedData.createdAt = sanitizedData.createdAt.toISOString();
      }
      
      // Guardar los datos
      await set(newItemRef, sanitizedData);
      
      const newItemId = newItemRef.key;
      console.log("Documento guardado con ID:", newItemId);
      
      setIsPending(false);
      return { id: newItemId, ...sanitizedData };
    } catch(err) {
      console.error("Error al guardar:", err);
      setError("No se pudo guardar el documento: " + err.message);
      setIsPending(false);
      throw err;
    }
  };

  // Actualizar un documento existente
  const update = async (id, updatedData) => {
    setError(null);
    setIsPending(true);
    
    try {
      console.log("Actualizando documento:", id, updatedData);
      
      // Crear un objeto con la ruta específica para la actualización
      const updates = {};
      updates[`${table}/${id}`] = updatedData;
      
      // Realizar la actualización
      await updateDB(ref(db), updates);
      
      console.log("Documento actualizado con éxito");
      setIsPending(false);
      return true;
    } catch(err) {
      console.error("Error al actualizar documento:", err);
      setError("No se pudo actualizar el documento: " + err.message);
      setIsPending(false);
      throw err;
    }
  };

  // Eliminar un documento
  const remove = async (id) => {
    setError(null);
    setIsPending(true);
    
    try {
      console.log("Eliminando documento:", id);
      
      // Referencia al documento específico
      const itemRef = ref(db, `${table}/${id}`);
      
      // Eliminar el documento
      await removeDB(itemRef);
      
      console.log("Documento eliminado con éxito");
      setIsPending(false);
      return true;
    } catch(err) {
      console.error("Error al eliminar documento:", err);
      setError("No se pudo eliminar el documento: " + err.message);
      setIsPending(false);
      throw err;
    }
  };

  return { 
    results, 
    error, 
    isPending, 
    add, 
    getAll, 
    update, 
    remove 
  };
};

export default useCollection;