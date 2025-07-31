// src/components/ProfessionalField.jsx
import React from 'react';

const ProfessionalField = () => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ddd' }}>
      <p style={{ fontWeight: 'bold' }}>Select Professional Field:</p>
      <select>
        <option value="">-- Select --</option>
        <option value="networking">Networking</option>
        <option value="web">Web Development</option>
        <option value="ai">Artificial Intelligence</option>
      </select>
    </div>
  );
};

export default ProfessionalField;
