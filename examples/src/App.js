import './App.css';
import { useState } from 'react';
import Content from './sampleCode/hooks/useEffect';

function App() {
  const [show, setShow] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Examples</h1>
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'} Content
      </button>
      {show && <Content />}
    </div>
  );
}

export default App;
