import React, { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import MeasurementForm from "./components/MeasurementForm";
import Invoice from "./components/Invoice";
import PaymentPage from "./components/PaymentPage";
import NavBar from "./components/NavBar";

const services = [
  { id: "suit", title: "Full Suit", price: 599 },
  { id: "shirt", title: "Shirt", price: 89 },
  { id: "pants", title: "Pants", price: 129 },
  { id: "accessories", title: "Accessories", price: 49 }
];

export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [measurements, setMeasurements] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleBack = () => {
    if (showPayment) {
      setShowPayment(false);
      setShowInvoice(true);
    } else if (showInvoice) {
      setShowInvoice(false);
      setSelectedService(null);
    } else if (selectedService) {
      setSelectedService(null);
    }
  };

  const handleForward = () => {
    if (selectedService && !showInvoice) setShowInvoice(true);
    else if (showInvoice && !showPayment) setShowPayment(true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Elegant Tailors</h1>
        <div className="auth-section">
          <SignedOut>
            <p>Please sign in to place an order</p>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      <NavBar onBack={handleBack} onForward={handleForward} canGoBack={!!selectedService} canGoForward={selectedService && !showPayment} />

      <main className="main-content">
        <SignedIn>
          {!selectedService ? (
            <div className="services-grid">{services.map((service) => (<div key={service.id} className="service-card" onClick={() => setSelectedService(service)}><h3>{service.title}</h3><p className="price">${service.price}</p></div>))}</div>
          ) : showInvoice ? <Invoice service={selectedService} measurements={measurements} onProceed={() => setShowPayment(true)} /> : <MeasurementForm service={selectedService} onSubmit={setMeasurements} />}
        </SignedIn>
      </main>
    </div>
  );
}
