import React, { useState } from 'react';
import { TextField } from '@mui/material';
import{LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
          /> <br/>
          <TextField
          label="email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin='normal'
          />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={formData.DateOfBirth}
            onChange={(newValue) => {
              setFormData(prev => ({
                ...prev,
                DateOfBirth: newValue,
              }));
            }}
            renderInput={(params) => (
            <TextField {...params} fullWidth margin="normal" variant="outlined" />
            )}
          />
        </LocalizationProvider>
  
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
