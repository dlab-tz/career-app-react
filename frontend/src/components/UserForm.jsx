import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    DateOfBirth: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.DateOfBirth || formData.DateOfBirth > new Date()) {
      alert('Please fill in Email and Date of Birth correctly');
    } else 
      if (!formData.email.includes('@') || !formData.email.includes('.')) {
      alert('Please enter a valid email address');
      }
    console.log('Submitted:', formData);
    // TODO: send this formdata to backend via api call
    // Example: axios.post('/api/user', formData)
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <h2>User Profile Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name field - others will add their fields below this */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Full Name:</label><br />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            fullWidth
            />
            <input
            type="date"
            name="DateOfBirth"
            value={formData.DateOfBirth}  
            onChange={handleChange}
            required
          />
  
        </div>

        {/* Additional fields can be added here */}
        {/* TODO: education level, career field, etc */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
