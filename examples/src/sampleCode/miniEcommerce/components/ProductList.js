import products from "../data/products";
import ProductItem from "./ProductItem";

function ProductList() {
  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: "flex" }}>
        {products.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
