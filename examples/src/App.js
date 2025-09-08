import './App.css';
import WithAuthExample from './sampleCode/HOC/withBorder';
import CarExample from './sampleCode/JSX/carExample';
import CarProps from './sampleCode/props/propsExample';

function App() {
  return (
    <div>
      <h1>React Examples</h1>
      <CarExample />
      <CarProps />
      <WithAuthExample />
    </div>
  );
}

export default App;
