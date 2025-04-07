import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, incrementBy } from "../store/Slices/counterSlice";

function CounterComponent() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementValue, setIncrementValue] = useState(1);

  const handleIncrementValueChange = (e) => {
    setIncrementValue(e.target.value);
  };

  const handleIncrementBy = () => {
    dispatch(incrementBy(Number(incrementValue)));
  };

  return (
    <div className="counter-container">
      <h2>Contador: {count}</h2>
      <div className="counter-controls">
        <button 
          onClick={() => dispatch(decrement())}
          className="button-decrement"
        >
          Decrementar
        </button>
        
        <div className="increment-controls">
          <input 
            type="number" 
            value={incrementValue} 
            onChange={handleIncrementValueChange}
            placeholder="Valor a incrementar"
            className="increment-input"
          />
          <button 
            onClick={handleIncrementBy}
            className="button-increment"
          >
            Incrementar por
          </button>
        </div>
      </div>
    </div>
  );
}

export default CounterComponent;