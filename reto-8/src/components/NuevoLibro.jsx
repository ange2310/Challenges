import { useEffect, useState } from "react";
import { Libro, Stack } from '../utils/libros';

function NuevoLibro() {
    const [nombre, setNombre] = useState('');
    const [isbn, setIsbn] = useState('');
    const [autor, setAutor] = useState('');
    const [editorial, setEditorial] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        // Inicializar libros con los elementos actuales del Stack
        setLibros(Stack.getItems());
    }, []);

    const handleCambiarNombre = (e) => setNombre(e.target.value);
    const handleCambiarIsbn = (e) => setIsbn(e.target.value);
    const handleCambiarAutor = (e) => setAutor(e.target.value);
    const handleCambiarEditorial = (e) => setEditorial(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoLibro = new Libro(nombre, isbn, autor, editorial);
        Stack.push(nuevoLibro);

        // Actualizar la lista local de libros
        setLibros(Stack.getItems());
        
        setMensaje(`El libro "${nombre}" ha sido agregado correctamente`);

        // Limpiar formulario
        setNombre('');
        setIsbn('');
        setAutor('');
        setEditorial('');
    };

    return(
        <div className="contenedor-principal">
            <div className="nuevoLibro">
                <h1>Agregar Nuevo libro</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <label>Título:</label>
                        <input 
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={handleCambiarNombre}
                            required
                        />
                    </div>
                    <div className="form-container">
                        <label>ISBN:</label>
                        <input 
                            type="text"
                            id="isbn"
                            value={isbn}
                            onChange={handleCambiarIsbn}
                            required
                        />
                    </div>
                    <div className="form-container">
                        <label>Autor:</label>
                        <input 
                            type="text"
                            id="autor"
                            value={autor}
                            onChange={handleCambiarAutor}
                            required
                        />
                    </div>
                    <div className="form-container">
                        <label>Editorial:</label>
                        <input 
                            type="text"
                            id="editorial"
                            value={editorial}
                            onChange={handleCambiarEditorial}
                            required
                        />
                    </div>

                    <button type="submit">Agregar</button>
                    <div className="mensaje">{mensaje}</div>
                </form>
            </div>
            
            {/* Sección para mostrar la pila de libros */}
            <div className="stack-container">
                <h2>Pila de Libros</h2>
                {libros.length === 0 ? (
                    <p>No hay libros en la pila</p>
                ) : (
                    <ul className="libro-list">
                        {libros.map((libro, index) => (
                            <li key={index} className="libro-item">
                                <div className="libro-card">
                                    <h3>{libro.nombre}</h3>
                                    <p><strong>ISBN:</strong> {libro.isbn}</p>
                                    <p><strong>Autor:</strong> {libro.autor}</p>
                                    <p><strong>Editorial:</strong> {libro.editorial}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default NuevoLibro;
