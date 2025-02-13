import React from "react";
import { generatePDF, sendInvoiceByEmail } from "../utils/pdfUtils";

const Invoice = ({ service, measurements, onProceed }) => (
  <div className="invoice-card">
    <h2>Invoice</h2>
    <div className="invoice-content">
      <p className="bold">Service: {service.title}</p>
      <p>Price: ${service.price}</p>
      <p className="bold">Measurements:</p>
      {Object.entries(measurements).map(([key, value]) => (
        <p key={key} className="measurement-item">
          {key.charAt(0).toUpperCase() + key.slice(1)}: {value} inches
        </p>
      ))}
      <p className="bold">Total: ${service.price}</p>

      <button onClick={() => generatePDF(service, measurements)} className="download-button">
        Download PDF
      </button>

      <button onClick={() => sendInvoiceByEmail(service, measurements)} className="email-button">
        Send Invoice to Email
      </button>

      <button onClick={onProceed} className="proceed-button">
        Proceed to Payment
      </button>
    </div>
  </div>
);

export default Invoice;
