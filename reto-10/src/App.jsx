import React from "react";
import { Provider } from "react-redux";
import { store } from "../src/store/Store"; 
import CounterComponent from "./components/counterComponent";
import StackComponent from "./components/StackComponent";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <h1 className="app-title">Challenge 10: Redux</h1>
        
        <div className="components-container">
          <div className="section">
            <h2 className="section-title">Parte 1 y 2: Contador con Redux</h2>
            <CounterComponent />
          </div>
          
          <div className="section">
            <h2 className="section-title">Parte 3: Implementación de Pila</h2>
            <StackComponent />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;