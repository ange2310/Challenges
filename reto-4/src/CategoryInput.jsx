import { useState } from 'react'

function CategoryInput({onAddCategory}){
    const [category, setCategory]=useState("");

    const handleChange = (event) =>{
        setCategory(event.target.value);
    }

    return (
        <div>
            <input
            type="text"
            value={category}
            onChange={handleChange}
            placeholder='Ingresa una categoría'
            />
            <button onClick={() => onAddCategory(category)}>Ingresar Categoría</button>
        </div>
    )
}

export default CategoryInput