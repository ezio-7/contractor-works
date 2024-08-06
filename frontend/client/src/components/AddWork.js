// AddWork.js
import React, { useState } from "react";
import axios from "axios";
import "./AddWork.css"; // Import the CSS file

const AddWork = () => {
  const [formData, setFormData] = useState({
    date: "",
    chief_engineer_zone: "",
    circle: "",
    division_name: "",
    name_of_agency: "",
    place_of_work: "",
    item_of_work: "",
    quantity: "",
    unit: "",
    rate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/add", formData)
      .then((response) => {
        alert("Work added successfully!");
        setFormData({
          date: "",
          chief_engineer_zone: "",
          circle: "",
          division_name: "",
          name_of_agency: "",
          place_of_work: "",
          item_of_work: "",
          quantity: "",
          unit: "",
          rate: "",
        });
      })
      .catch((error) => {
        console.error("There was an error adding the work!", error);
      });
  };

  return (
    <div className="add-work-container">
      <h2>Add New Work</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="chief_engineer_zone"
          placeholder="Chief Engineer Zone"
          value={formData.chief_engineer_zone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="circle"
          placeholder="Circle"
          value={formData.circle}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="division_name"
          placeholder="Division Name"
          value={formData.division_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name_of_agency"
          placeholder="Name of Agency"
          value={formData.name_of_agency}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="place_of_work"
          placeholder="Place of Work"
          value={formData.place_of_work}
          onChange={handleChange}
          required
        />
        <textarea
          name="item_of_work"
          placeholder="Item of Work"
          value={formData.item_of_work}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="unit"
          placeholder="Unit"
          value={formData.unit}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rate"
          placeholder="Rate"
          value={formData.rate}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Work</button>
      </form>
    </div>
  );
};

export default AddWork;
