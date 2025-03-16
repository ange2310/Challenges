import React, { useEffect, useState } from "react";
import LinkedList from "../utils/LinkedList";
import songsData from "../data/songsData";

const LinkedListPage = () => {
  const [playList, setPlayList] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [endOfList, setEndOfList] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Crear una nueva lista
    const newPlaylist = new LinkedList();
    
    // Llenar lista con datos importados
    songsData.forEach((song) => {
      newPlaylist.append(song);
    });
    
    // Guardar lista en el estado
    setPlayList(newPlaylist);

    if (newPlaylist.head) {
      newPlaylist.current = newPlaylist.head;
      setCurrentSong(newPlaylist.head.song);
    }
  }, []); // Array vacío para que solo se ejecute al montar el componente

  const handleNext = () => {
    if (playList) {
      const result = playList.next();
      if (result && result.song) {
        setCurrentSong(result.song);
        setEndOfList(result.end);
        if (result.message) {
          setMessage(result.message);
        }
      }
    }
  };

  // Si aún no se ha cargado la lista o no hay canción actual
  if (!currentSong) {
    return (
      <div className="loading-container">
        <h2>Cargando reproductor...</h2>
      </div>
    );
  }

  return (
    <div className="music-player-container">
      <div className="player-header">
        <h1>Mi Reproductor de Música</h1>
        <p>Implementación con lista enlazada</p>
      </div>
  
      <div className="current-song-card">
        {/* Mostrar información de la canción actual */}
        <div className="song-info">
          <h2>Canción actual: {currentSong.title}</h2>
          {currentSong.artist && <p>Artista: {currentSong.artist}</p>}
          {currentSong.album && <p>Álbum: {currentSong.album}</p>}
        </div>
      </div>
  
      <div className="player-controls">
        <button 
          className="control-button next" 
          onClick={handleNext}
          disabled={endOfList}
        >
          Next ➡️
        </button>
      </div>

      {message && (
        <div className="message-container">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default LinkedListPage;