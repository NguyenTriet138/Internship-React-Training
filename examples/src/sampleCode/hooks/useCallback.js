import React from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Render Child");
  return <button onClick={onClick}>Click Me</button>;
});

export default Child;
