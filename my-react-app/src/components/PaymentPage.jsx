import React from "react";

const PaymentPage = ({ total }) => (
  <div className="payment-card">
    <h2>Payment</h2>
    <div className="payment-content">
      <p>Total Amount: ${total}</p>
      <button className="pay-button">Pay Now</button>
    </div>
  </div>
);

export default PaymentPage;
