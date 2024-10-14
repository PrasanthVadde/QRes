// PaymentScreen.js
import "./paymentScreen.scss";
import { Card, Button, Input } from "antd";

const PaymentScreen = () => {
  return (
    <div className="payment-screen">
      <Card
        title="Payment Details"
        style={{ width: 400, margin: "auto", marginTop: "50px" }}
      >
        <h3>Total Amount: $XX.XX</h3>{" "}
        <div className="payment-form">
          <Input placeholder="Card Number" style={{ marginBottom: "10px" }} />
          <Input
            placeholder="Expiration Date (MM/YY)"
            style={{ marginBottom: "10px" }}
          />
          <Input placeholder="CVC" style={{ marginBottom: "10px" }} />
        </div>
        <Button type="primary" block>
          Pay Now
        </Button>
      </Card>
    </div>
  );
};

export default PaymentScreen;
