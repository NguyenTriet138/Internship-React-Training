import { useState, useRef } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const timerId = useRef();

  const handleStart = () => {
    if (!timerId.current) {
      timerId.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }
  };

  const handleStop = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Counter Example</h2>
      <h3>Count: {count}</h3>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}

export default Counter;
