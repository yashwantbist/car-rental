import { useCart } from "../context/CartContext";

export default function ShoppingCart() {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return <h2>Your cart is empty 🛒</h2>;
  }

  return (
    <div>
      <h1>My Shopping Cart</h1>
      <ul>
        {cartItems.map((car) => (
          <li key={car.id}>
            <img src={car.image} alt={car.make} style={{ width: "100px" }} />
            <p>{car.make} {car.model} ({car.year}) - ${car.price}/day</p>
            <button onClick={() => removeFromCart(car.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
