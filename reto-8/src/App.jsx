import { useState } from 'react';
import NuevoLibro from './components/NuevoLibro';

function App() {
  return(
    <div className='App'>
      <header className='App-header'>
        <h1>Gestión de Libros</h1>
      </header>
      <main>
        <NuevoLibro/>
      </main>
    </div>
  );
}

export default App;