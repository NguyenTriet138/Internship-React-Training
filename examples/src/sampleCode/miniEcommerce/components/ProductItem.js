import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product.id}`}>View Detail</Link>
    </div>
  );
}

export default ProductItem;
