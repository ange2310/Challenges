import { useState } from 'react'
import styles from './components/CategoryInput.module.scss'

function CategoryInput({ onAddCategory, isLoading = false, categoriesCount = 0 }) {
    const [category, setCategory] = useState("")

    const handleChange = (event) => {
        setCategory(event.target.value)
    }

    const handleSubmit = () => {
        if (category.trim() !== "") {
            const result = onAddCategory(category)
            setCategory("")
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        value={category}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        placeholder='Escribe una nueva categoría...'
                        className={styles.input}
                        disabled={isLoading}
                    />
                </div>
                
                <button 
                    onClick={handleSubmit}
                    className={styles.button}
                    disabled={isLoading}
                >
                    Agregar Categoría
                </button>
            </div>
        </div>
    )
}

export default CategoryInput