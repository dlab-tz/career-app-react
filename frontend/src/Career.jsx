

import React, { useState } from 'react';
import './career.css';

const Career = () => {
  const [phone, setPhone] = useState('');
  const [career, setCareer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Phone: ${phone}\nEducation Level: ${career}`);
  };

  return (
    <div className="career-body">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Career Info</h2>

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />

        <label htmlFor="education">Level of Education</label>
        <select
          id="education"
          name="education"
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          required
        >
          <option value="">Select your level</option>
          <option value="None">None</option>
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Master">Master</option>
          <option value="PhD">PhD</option>
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Career;