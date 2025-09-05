function withBorder(WrappedComponent) {
  return function NewComponent(props) {
    return (
      <div style={{ border: '2px solid blue', padding: '10px' }}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

const GreetingWithBorder = withBorder(Greeting);

export default function WithAuthExample() {
  return (
    <div>
      <Greeting name="John" />
      <GreetingWithBorder name="Jane" />
    </div>
  );
}
