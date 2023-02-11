import { useEffect, useState } from "react";
import { useDataAuthRedux } from "../../redux/selector";

const CartPage = () => {
  const dataUserRedux = useDataAuthRedux();
  console.log(dataUserRedux);

  const [cart, setCart] = useState([
    { name: "Latte", price: 4.5 },
    { name: "Espresso", price: 3.0 },
    { name: "Cappuccino", price: 4.0 },
  ]);

  useEffect(() => {
    if (dataUserRedux.cart) {
      setCart(dataUserRedux.cart);
    }
  }, [dataUserRedux?.cart]);

  return (
    <>
      <div>
        {cart.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </div>
    </>
  );
};

export default CartPage;
