import React, { useState, useEffect } from 'react';
import '../styles/styles.css'; // Importa el archivo CSS
import Queue from '../utils/pila'; // Importa la clase Queue

const Atm = () => {
  // Inicializar la cola
  const [peopleQueue] = useState(new Queue());
  // Estado para controlar la renderización de la UI
  const [queueState, setQueueState] = useState([]);
  
  // Estados para el formulario
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  // Cargar datos iniciales en la cola
  useEffect(() => {
    // Datos de ejemplo
    const initialData = [
      { name: 'Juan Pérez', amount: 500 },
      { name: 'María González', amount: 1200 },
      { name: 'Carlos Rodríguez', amount: 800 }
    ];
    
    // Agregar los datos iniciales a la cola
    initialData.forEach(person => {
      peopleQueue.enqueue(person);
    });
    
    // Actualizar el estado para renderizar
    updateQueueState();
  }, []);

  // Función para actualizar el estado de la cola en la UI
  const updateQueueState = () => {
    setQueueState(peopleQueue.getAll());
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!name.trim() || !amount) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError('El monto debe ser un número positivo');
      return;
    }
    
    // Crear nuevo objeto persona
    const newPerson = {
      name: name.trim(),
      amount: parseFloat(amount)
    };
    
    // Agregar a la cola utilizando el método enqueue
    peopleQueue.enqueue(newPerson);
    
    // Actualizar el estado para renderizar
    updateQueueState();
    
    // Limpiar el formulario
    setName('');
    setAmount('');
    setError('');
  };

  // Función para procesar a la siguiente persona en la cola
  const handleNextPerson = () => {
    if (!peopleQueue.isEmpty()) {
      // Retirar a la primera persona de la cola
      const person = peopleQueue.dequeue();
      console.log(`Procesando a: ${person.name}, Monto: $${person.amount}`);
      
      // Actualizar el estado para renderizar
      updateQueueState();
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-inner">
          <div className="header">
            <h1 className="title">Cola de ATM</h1>
            <p className="subtitle">Gestión de personas en espera</p>
          </div>

          {/* Formulario para agregar personas */}
          <div className="form-container">
            <h2 className="form-title">Agregar Persona</h2>
            
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name" className="label">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="amount" className="label">Monto a retirar:</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input"
                />
              </div>
              
              {error && <p className="error">{error}</p>}
              
              <button 
                type="submit" 
                className="button"
              >
                Agregar a la Cola
              </button>
            </form>
          </div>
          
          {/* Mostrar la cola */}
          <div className="queue-section">
            <div className="queue-header">
              <h2 className="queue-title">Personas en Cola</h2>
              <button 
                onClick={handleNextPerson} 
                className="button next-button" 
                disabled={peopleQueue.isEmpty()}
              >
                Procesar Siguiente
              </button>
            </div>
            
            {queueState.length === 0 ? (
              <p className="empty-queue">No hay personas en la cola</p>
            ) : (
              <ul className="queue-list">
                {queueState.map((person, index) => (
                  <li key={index} className="queue-item">
                    <div className="person-info">
                      <p className="name">{person.name}</p>
                      <p className="position">Posición: {index + 1}</p>
                    </div>
                    <div className="amount-info">
                      <p className="amount">${person.amount}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Atm;