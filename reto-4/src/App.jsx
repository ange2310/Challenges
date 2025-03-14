import { useState } from 'react'

import './App.css'
import CategoryInput from './CategoryInput'

function App() {
  const [categories, setCategories] = useState([]) //Se inicializa categories como array vacio ([]) porque se comienza sin categorias

  const addCategory = (newCategory) => {     //recibe una nueva categoria en el input y se verifica que la categoria no este vacia con trim()!==""
    if(newCategory.trim() !== ""){      
      console.log("Categoría agregada:", newCategory)          // trim() quita de la cadena de texto los espacios en blanco iniciales y finales
      setCategories([...categories,newCategory])  // Se actualiza el estado del array con setCategories, (...)= se usa para copiar las categorias anteriores
    } else{
      console.log("Categoría vacía, ingrese un valor válido") 
    }
  }

  return (
    <div>
      <h1>Lista de Categorías</h1>
      <CategoryInput onAddCategory={addCategory} />
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
