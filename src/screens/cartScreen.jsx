import { Button, Card } from "antd";
import "./CartScreen.scss";
import { useSelector, useDispatch } from "react-redux";
import { incrementItem, decrementItem } from "../redux/cartSlice.js";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemIncrementHandler = (id) => {
    dispatch(incrementItem(id));
  };

  const itemDecrementHandler = (id) => {
    dispatch(decrementItem(id));
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);

  const orderHandler = () => {
    navigate('/payment');
  }

  return (
    <div className="cart-screen">
      {cart.length > 0 ? (
        cart.map((item) => (
          <Card key={item.id}>
            <div className="cart-item">
              <h1>{item.name}</h1>
              <div className="button-container">
                <Button onClick={() => itemIncrementHandler(item.id)}>+</Button>
                <span>{item.quantity || 1}</span>
                <Button 
                  onClick={() => itemDecrementHandler(item.id)} 
                  disabled={(item.quantity || 1) <= 1}
                >
                  -
                </Button>
                <h4>${item.price * (item.quantity || 1)}</h4>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="empty-cart">
          <Card>
            <img src="./cart.png" alt="empty cart" />
            <h1>Cart is Empty</h1>
            <p style={{ textAlign: "center" }}>Add items from the Menu</p>
          </Card>
        </div>
      )}
      <div className="order-description">
        <Card title="Order Details">
          <h3>Total items: {cart.length}</h3>
          <h3>Total price: ${totalPrice.toFixed(2)}</h3>
          <Button onClick={orderHandler}>Order</Button>
        </Card>
      </div>
    </div>
  );
};

export default CartScreen;
