import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { push, pop, clear } from "../store/Slices/stackSlice";

export default function StackComponent() {
  const stack = useSelector((state) => state.stack.items);
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState("");

  const handleItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const handlePush = () => {
    if (newItem.trim() !== "") {
      dispatch(push(newItem));
      setNewItem(""); 
    }
  };

  const handlePop = () => {
    dispatch(pop());
  };

  const handleClear = () => {
    dispatch(clear());
  };

  return (
    <div className="stack-container">
      <h2>Pila (Stack)</h2>
      
      <div className="stack-controls">
        <input
          type="text"
          value={newItem}
          onChange={handleItemChange}
          placeholder="Agregar elemento"
          className="stack-input"
        />
        <button onClick={handlePush} className="button-push">Agregar</button>
        <button onClick={handlePop} className="button-pop">Eliminar</button>
        <button onClick={handleClear} className="button-clear">Limpiar</button>
      </div>

      <div className="stack-display">
        <h3>Elementos ({stack.length})</h3>
        {stack.length === 0 ? (
          <p className="empty-message">La pila está vacía</p>
        ) : (
          <ul className="stack-items">
            {[...stack].reverse().map((item, index) => (
              <li key={index} className="stack-item">
                <span className="item-index">{stack.length - index}</span>
                <span className="item-value">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

