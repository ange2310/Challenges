import { db } from "../firebase/config";
import { collection, addDoc, query, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

const useCollection = (table) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const getAll = async (condition) => {
    setIsPending(true);
    setError(null);
    
    try {
      let newResults = [];
      
      const q = query(collection(db, table));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        newResults.push({ ...doc.data(), id: doc.id });
      });
      
      console.log(`Cargados ${newResults.length} usuarios de ${table}`);
      // Actualizar el estado con los nuevos resultados
      setResults(newResults);
    } catch (error) {
      console.error("Error obteniendo documentos:", error);
      setError("No se pudieron cargar los datos");
    } finally {
      setIsPending(false);
    }
  };

  // Función para añadir un nuevo documento
  const add = async (doc) => {
    setError(null);
    setIsPending(true);
    
    try {
      // Añade logs para depuración
      console.log("Intentando guardar documento:", doc);
      console.log("En colección:", table);
      
      let refDoc = await addDoc(collection(db, table), doc);
      console.log("Documento guardado con ID:", refDoc.id);
      
      setIsPending(false);
      return refDoc;
    } catch(err) {
      console.error("Error al guardar:", err);
      setError("Could not save the document");
      setIsPending(false);
      return null;
    }
  };
  const save = async () => {
    try {
      console.log("Iniciando guardado...");
      console.log("Estado de autenticación:", isAuthenticated);
      console.log("Datos a guardar:", user);
      
      if (!isAuthenticated) {
        alert("Debes estar autenticado para realizar esta acción");
        return;
      }
      
      if (editingId) {
        console.log("Actualizando usuario con ID:", editingId);
        const updateResult = await update(editingId, user);
        console.log("Resultado de actualización:", updateResult);
      } else {
        console.log("Añadiendo nuevo usuario");
        const addResult = await add(user);
        console.log("Resultado de añadir:", addResult);
      }
      
      setUser({ name: '' });
      setEditingId(null);
      
      console.log("Recargando documentos...");
      await getAllDocs();
      console.log("Documentos recargados");
    } catch (error) {
      console.error("Error en operación de guardar:", error);
      alert("Error al guardar. Verifica la consola para más detalles.");
    }
  }

  // Función para actualizar un documento existente
  const update = async (id, updatedData) => {
    setError(null);
    setIsPending(true);
    
    try {
      console.log("Actualizando documento con ID:", id, "Datos:", updatedData);
      
      const docRef = doc(db, table, id);
      await updateDoc(docRef, updatedData);
      
      console.log("Documento actualizado con éxito");
      setIsPending(false);
      return true;
    } catch(err) {
      console.error("Error al actualizar documento:", err);
      setError("No se pudo actualizar el documento");
      setIsPending(false);
      return false;
    }
  };

  // Función para eliminar un documento
  const remove = async (id) => {
    setError(null);
    setIsPending(true);
    
    try {
      const docRef = doc(db, table, id);
      await deleteDoc(docRef);
      console.log("Documento eliminado: " + id);
      setIsPending(false);
      return true;
    } catch(err) {
      console.log(err.message);
      setError("Could not delete the document");
      setIsPending(false);
      return false;
    }
  };

  return { error, isPending, results, add, getAll, save,update, remove };
};

export default useCollection;