import React, { useState } from "react";

const ProfessionalField = () => {
  const [field, setField] = useState("");

  const handleChange = (e) => {
    setField(e.target.value);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "24px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <label
        htmlFor="field"
        style={{
          display: "block",
          fontSize: "18px",
          fontWeight: "500",
          marginBottom: "10px",
          color: "#333",
        }}
      >
        Select Your Professional Field
      </label>

      <select
        id="field"
        value={field}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
          outline: "none",
        }}
      >
        <option value="">-- Choose Field --</option>
        <option value="Software Engineering">Software Engineering</option>
        <option value="Network Engineering">Network Engineering</option>
        <option value="Telecommunications">Telecommunications</option>
        <option value="Data Science">Data Science</option>
        <option value="AI & Machine Learning">AI & Machine Learning</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
    </div>
  );
};

export default ProfessionalField;
