import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    DateOfBirth: null,
    educationLevel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Only allow numbers, max 10 digits
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.DateOfBirth || formData.DateOfBirth > new Date()) {
      alert('Please fill in Email and Date of Birth correctly');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      alert('Please enter a valid email address');
      return;
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    if (!formData.educationLevel) {
      alert('Please select your education level');
      return;
    }
    console.log('Submitted:', formData);
    // TODO: send this formdata to backend via api call
    // Example: axios.post('/api/user', formData)
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <h2>User Profile Form</h2>
      <form onSubmit={handleSubmit}>
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
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin='normal'
          />
          <br />
          <TextField
            label="Phone"
            variant="outlined"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin='normal'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }}
            required
            style={{ marginLeft: 10 }}
            placeholder="10 digits"
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
          <br />
          <FormControl fullWidth margin="normal">
            <InputLabel id="education-level-label">Education Level</InputLabel>
            <Select
              labelId="education-level-label"
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              label="Education Level"
              onChange={handleChange}
              required
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Standard 7">Standard 7</MenuItem>
              <MenuItem value="O Level">O Level</MenuItem>
              <MenuItem value="A Level">A Level</MenuItem>
              <MenuItem value="Diploma">Diploma</MenuItem>
              <MenuItem value="Degree">Degree</MenuItem>
              <MenuItem value="Masters">Masters</MenuItem>
              <MenuItem value="PhD">PhD</MenuItem>
              <MenuItem value="Professor">Professor</MenuItem>
            </Select>
          </FormControl>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
