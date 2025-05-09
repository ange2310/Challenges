import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ref, push, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { db, auth } from '../firebase/config';

export const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Obtener datos de autenticación del estado de Redux
  const { status, displayName, photoURL, uid } = useSelector(state => state.auth);
  
  // Referencia para desplazarse al final de los mensajes
  const messagesEndRef = useRef(null);

  // Función para desplazarse al final de los mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cargar mensajes desde Firebase cuando el componente se monta
  useEffect(() => {
    if (status !== 'authenticated') {
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Referencia a los mensajes en Firebase Realtime Database
      const messagesRef = query(
        ref(db, 'messages'),
        orderByChild('timestamp'),
        limitToLast(100) // Limitar a los últimos 100 mensajes
      );
      
      // Escuchar cambios en tiempo real
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const messagesData = snapshot.val();
        const messagesList = [];
        
        if (messagesData) {
          // Convertir objeto a array con IDs
          Object.keys(messagesData).forEach(key => {
            messagesList.push({
              id: key,
              ...messagesData[key]
            });
          });
          
          // Ordenar mensajes por timestamp
          messagesList.sort((a, b) => a.timestamp - b.timestamp);
          setMessages(messagesList);
        }
        
        setLoading(false);
        // Desplazarse al final cuando hay nuevos mensajes
        setTimeout(scrollToBottom, 100);
      }, (error) => {
        console.error("Error cargando mensajes:", error);
        setError("No se pudieron cargar los mensajes: " + error.message);
        setLoading(false);
      });
      
      // Limpiar el listener al desmontar
      return () => unsubscribe();
    } catch (error) {
      console.error("Error configurando listener de mensajes:", error);
      setError("Error al conectar con el chat: " + error.message);
      setLoading(false);
    }
  }, [status]);

  // Enviar un mensaje
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || !auth.currentUser) {
      return;
    }
    
    try {
      const messagesRef = ref(db, 'messages');
      
      // Crear objeto de mensaje
      const newMessage = {
        text: message.trim(),
        uid: auth.currentUser.uid,
        displayName: displayName || auth.currentUser.email.split('@')[0],
        photoURL: photoURL || '',
        timestamp: Date.now()
      };
      
      // Guardar en Firebase
      await push(messagesRef, newMessage);
      
      // Limpiar campo de entrada
      setMessage('');
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      setError("Error al enviar mensaje: " + error.message);
    }
  };

  // Formatear timestamp para mostrar hora
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Verificar si el mensaje es del usuario actual
  const isCurrentUser = (messageUid) => {
    return messageUid === uid;
  };

  return (
    <div className="chat-container">
      <h2>Chat en tiempo real</h2>
      
      {/* Mostrar mensajes de error si existen */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {/* Contenedor de mensajes */}
      <div className="messages-container">
        {loading ? (
          <div className="loading-message">Cargando mensajes...</div>
        ) : (
          <>
            {messages.length === 0 ? (
              <div className="empty-messages">
                No hay mensajes aún. ¡Sé el primero en escribir!
              </div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`message ${isCurrentUser(msg.uid) ? 'message-own' : 'message-other'}`}
                >
                  <div className="message-header">
                    {!isCurrentUser(msg.uid) && (
                      <>
                        {msg.photoURL ? (
                          <img 
                            src={msg.photoURL} 
                            alt="Avatar" 
                            className="message-avatar" 
                          />
                        ) : (
                          <div className="message-avatar-placeholder">
                            {msg.displayName ? msg.displayName.charAt(0).toUpperCase() : '?'}
                          </div>
                        )}
                        <span className="message-sender">{msg.displayName}</span>
                      </>
                    )}
                    <span className="message-time">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div className="message-body">
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {/* Formulario para enviar mensajes */}
      {status === 'authenticated' ? (
        <form className="message-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={!message.trim() || loading}
            className="send-button"
          >
            Enviar
          </button>
        </form>
      ) : (
        <div className="auth-needed">
          Debes iniciar sesión para participar en el chat
        </div>
      )}
    </div>
  );
};