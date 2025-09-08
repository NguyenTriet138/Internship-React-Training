function Car() {
  const myobj = {
    name: "Fiat",
    model: "500",
    color: "white"
  };

  return (
    <>
      <h2 style={{
        backgroundColor: 'black',
        color: 'pink'
      }}>
        My Car
      </h2>
      <p>It is a {myobj.color} {myobj.name} {myobj.model}.</p>
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
