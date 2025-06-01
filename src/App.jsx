import { useState } from 'react'
import styles from './components/App.module.scss'
import CategoryInput from './CategoryInput'

function App() {
  const [categories, setCategories] = useState([])

  const addCategory = (newCategory) => {
    if (newCategory.trim() !== "") {
      console.log("Categoría agregada:", newCategory)
      setCategories(prev => [...prev, newCategory])
      return { success: true, message: "¡Categoría agregada exitosamente!" }
    } else {
      return { success: false, message: "Por favor ingresa una categoría válida" }
    }
  }

  const removeCategory = (indexToRemove) => {
    setCategories(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const clearAllCategories = () => {
    setCategories([])
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Gestor de Categorías
        </h1>
        <p className={styles.subtitle}>
          Organiza tus ideas de forma elegante y moderna
        </p>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.inputSection}>
          <CategoryInput 
            onAddCategory={addCategory} 
            isLoading={false}
            categoriesCount={categories.length}
          />
        </section>

        <section className={styles.categoriesSection}>
          {categories.length > 0 ? (
            <>
              <div className={styles.categoriesHeader}>
                <h2 className={styles.categoriesTitle}>
                  Mis Categorías
                </h2>
                <span className={styles.categoriesCount}>
                  {categories.length}
                </span>
              </div>
              
              <ul className={styles.categoriesList}>
                {categories.map((category, index) => (
                  <li 
                    key={index} 
                    className={styles.categoryItem}
                    onClick={() => removeCategory(index)}
                    title="Click para eliminar"
                  >
                    <span className={styles.categoryText}>{category}</span>
                    <div className={styles.categoryIcon}></div>
                  </li>
                ))}
              </ul>
              
              {categories.length > 2 && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button 
                    onClick={clearAllCategories}
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🗑️ Limpiar Todo
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>
                ¡Comienza agregando tu primera categoría!
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App