import React, { useState } from "react";

const MeasurementForm = ({ service, onSubmit }) => {
  const [measurements, setMeasurements] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(measurements);
  };

  return (
    <form onSubmit={handleSubmit} className="measurement-form">
      <h2>Enter Measurements for {service.title}</h2>
      {service.id === "suit" && (
        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="chest">Chest (inches)</label>
            <input id="chest" type="number" onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })} required />
          </div>
          <div className="form-group">
            <label htmlFor="waist">Waist (inches)</label>
            <input id="waist" type="number" onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })} required />
          </div>
          <div className="form-group">
            <label htmlFor="length">Length (inches)</label>
            <input id="length" type="number" onChange={(e) => setMeasurements({ ...measurements, length: e.target.value })} required />
          </div>
        </div>
      )}
      <button type="submit" className="submit-button">Generate Invoice</button>
    </form>
  );
};

export default MeasurementForm;
