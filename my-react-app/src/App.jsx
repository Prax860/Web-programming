import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import './styles.css';

const services = [
  { id: 'suit', title: 'Full Suit', price: 599 },
  { id: 'shirt', title: 'Shirt', price: 89 },
  { id: 'pants', title: 'Pants', price: 129 },
  { id: 'accessories', title: 'Accessories', price: 49 }
];

const MeasurementForm = ({ service, onSubmit }) => {
  const [measurements, setMeasurements] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(measurements);
  };

  return (
    <form onSubmit={handleSubmit} className="measurement-form">
      <h2>Enter Measurements for {service.title}</h2>
      {service.id === 'suit' && (
        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="chest">Chest (inches)</label>
            <input
              id="chest"
              type="number"
              onChange={(e) => setMeasurements({...measurements, chest: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="waist">Waist (inches)</label>
            <input
              id="waist"
              type="number"
              onChange={(e) => setMeasurements({...measurements, waist: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="length">Length (inches)</label>
            <input
              id="length"
              type="number"
              onChange={(e) => setMeasurements({...measurements, length: e.target.value})}
              required
            />
          </div>
        </div>
      )}
      <button type="submit" className="submit-button">Generate Invoice</button>
    </form>
  );
};

const Invoice = ({ service, measurements, onProceed }) => (
  <div className="invoice-card">
    <h2>Invoice</h2>
    <div className="invoice-content">
      <div className="invoice-section">
        <p className="bold">Service: {service.title}</p>
        <p>Price: ${service.price}</p>
      </div>
      <div className="invoice-section">
        <p className="bold">Measurements:</p>
        {Object.entries(measurements).map(([key, value]) => (
          <p key={key} className="measurement-item">
            {key.charAt(0).toUpperCase() + key.slice(1)}: {value} inches
          </p>
        ))}
      </div>
      <div className="invoice-section">
        <p className="bold">Total: ${service.price}</p>
      </div>
      <button onClick={onProceed} className="proceed-button">
        Proceed to Payment
      </button>
    </div>
  </div>
);

const PaymentPage = ({ total }) => (
  <div className="payment-card">
    <h2>Payment</h2>
    <div className="payment-content">
      <p>Total Amount: ${total}</p>
      <button className="pay-button">Pay Now</button>
    </div>
  </div>
);

export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [measurements, setMeasurements] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setMeasurements(null);
    setShowInvoice(false);
    setShowPayment(false);
  };

  const handleMeasurementSubmit = (measurements) => {
    setMeasurements(measurements);
    setShowInvoice(true);
  };

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Elegant Tailors</h1>
        <div className="auth-section">
          <SignedOut>
            <div className="signed-out">
              <p>Please sign in to place an order</p>
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      <main className="main-content">
        <SignedIn>
          {!selectedService && (
            <div className="services-grid">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className="service-card"
                  onClick={() => handleServiceSelect(service)}
                >
                  <h3>{service.title}</h3>
                  <p className="price">${service.price}</p>
                </div>
              ))}
            </div>
          )}

          {selectedService && !showInvoice && !showPayment && (
            <MeasurementForm 
              service={selectedService}
              onSubmit={handleMeasurementSubmit}
            />
          )}

          {showInvoice && !showPayment && (
            <Invoice
              service={selectedService}
              measurements={measurements}
              onProceed={handleProceedToPayment}
            />
          )}

          {showPayment && (
            <PaymentPage total={selectedService.price} />
          )}

          {(selectedService || showInvoice || showPayment) && (
            <div className="start-over">
              <button 
                className="start-over-button"
                onClick={() => {
                  setSelectedService(null);
                  setMeasurements(null);
                  setShowInvoice(false);
                  setShowPayment(false);
                }}
              >
                Start Over
              </button>
            </div>
          )}
        </SignedIn>
      </main>
    </div>
  );
}