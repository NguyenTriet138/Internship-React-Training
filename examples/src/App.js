import './App.css';
import WithAuthExample from './sampleCode/HOC/withBorder';
import CarExample from './sampleCode/JSX/carExample';
import CarProps from './sampleCode/props/propsExample';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  }

  const handleDecrement = () => {
    setCount(count - 1);
  }

  return (
    <div>
      <h1>React Examples</h1>
      <CarExample />
      <CarProps />
      <WithAuthExample />
      <div style={{ padding: '20px' }}>
        <h2>Counter Example</h2>
        <p>Count: {count}</p>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
    </div>
  );
}

export default App;
