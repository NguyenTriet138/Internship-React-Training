import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();

  return (
    <li>
      {item.name} - ${item.price} x{" "}
      <input
        type="number"
        value={item.qty}
        min="1"
        onChange={(e) => updateQty(item.id, Number(e.target.value))}
      />
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </li>
  );
}

export default CartItem;
