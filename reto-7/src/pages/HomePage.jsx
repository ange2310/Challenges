import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Reto 07 - Estructuras de Datos</h1>
        <p>Implementación de listas enlazadas para navegación y reproducción</p>
      </header>

      <div className="challenges-container">
        <div className="challenge-card">
          <h2>Lista Enlazada Simple</h2>
          <p>Implementación de un reproductor de música utilizando una lista enlazada.</p>
          <Link to="/LinkedListPage" className="challenge-button">
            Ver Reproductor de Música
          </Link>
        </div>

        <div className="challenge-card">
          <h2>Lista Doblemente Enlazada</h2>
          <p>Implementación de un historial de navegación utilizando una lista doblemente enlazada.</p>
          <Link to="/doubly-linked-list" className="challenge-button">
            Ver Historial de Navegación
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;