import React, { useEffect, useState } from "react";
import DoublyLinkedList from "../utils/DoublyLinkedList";
import pagesData from "../data/pagesData";

const DoublyLinkedListPage = () => {
  const [browserHistory, setBrowserHistory] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    // Inicializar la lista con los datos simulados
    const history = new DoublyLinkedList();
    
    pagesData.forEach(page => {
      history.append(page);
    });
    
    setBrowserHistory(history);
    
    // Establecer la página actual como la más reciente (última)
    if (history.tail) {
      history.current = history.tail;
      setCurrentPage(history.tail.page);
      setCanGoBack(history.canGoBack());
      setCanGoForward(history.canGoForward());
    }
  }, []);

  // Función para navegar hacia atrás
  const handleBack = () => {
    if (browserHistory && canGoBack) {
      const result = browserHistory.previous();
      setCurrentPage(result.page);
      setCanGoBack(browserHistory.canGoBack());
      setCanGoForward(browserHistory.canGoForward());
    }
  };

  // Función para navegar hacia adelante
  const handleForward = () => {
    if (browserHistory && canGoForward) {
      const result = browserHistory.next();
      setCurrentPage(result.page);
      setCanGoBack(browserHistory.canGoBack());
      setCanGoForward(browserHistory.canGoForward());
    }
  };

  // Función para visitar una nueva página (simular navegar a una URL)
  const handleVisitPage = (url) => {
    if (browserHistory) {
      // Crear una nueva página
      const newPage = {
        title: `Página ${Date.now()}`,
        url: url || `https://example.com/${Date.now()}`,
      };
      
      // Añadir a la historia usando addNewPage (si tienes ese método)
      // o simplemente append si estás en la página más reciente
      browserHistory.append(newPage);
      
      // Actualizar el estado
      browserHistory.current = browserHistory.tail;
      setCurrentPage(newPage);
      setCanGoBack(true);
      setCanGoForward(false);
    }
  };

  // Si aún no se ha cargado la lista o no hay página actual
  if (!currentPage) {
    return (
      <div className="loading-container">
        <h2>Cargando historial de navegación...</h2>
      </div>
    );
  }

  return (
    <div className="browser-history">
      <h1>Historial de Navegación</h1>
      
      <div className="navigation-controls">
        <button 
          className="control-button back" 
          onClick={handleBack} 
          disabled={!canGoBack}
        >
          ← 
        </button>
        
        <button 
          className="control-button forward" 
          onClick={handleForward} 
          disabled={!canGoForward}
        >
          →
        </button>
      </div>
      
      <div className="current-page">
        <h2>{currentPage.title}</h2>
        <p><strong>URL:</strong> <a href={currentPage.url} target="_blank" rel="noopener noreferrer">{currentPage.url}</a></p>
      </div>
      
      <div className="history-status">
        <p>Estado: {canGoBack ? "Puedes retroceder" : "No puedes retroceder"} | 
           {canGoForward ? "Puedes avanzar" : "No puedes avanzar"}</p>
      </div>
    </div>
  );
};

export default DoublyLinkedListPage;