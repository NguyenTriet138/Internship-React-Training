function Car() {
  const brand = "Ford";
  const model = "Mustang";

  return (
    <>
      <h2 style={{
        backgroundColor: 'black',
        color: 'pink'
      }}>
        My Car
      </h2>
      <p>It is a {brand} {model}.</p>
    </>
  );
}

export default function CarExample() {
  return (
    <div>
      <Car />
    </div>
  );
}
