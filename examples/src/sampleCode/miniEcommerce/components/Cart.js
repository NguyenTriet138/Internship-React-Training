import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

function Cart() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      <ul>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <h3>Total: ${total}</h3>
      {cart.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
    </div>
  );
}

export default Cart;
