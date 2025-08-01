import React, { useState } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    DateOfBirth: null,
    ProfessionalField: '',
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
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      alert('Please enter a valid email address');
      return;
    }

    console.log('Submitted:', formData);
    // TODO: send this formdata to backend via API call
    // Example: axios.post('/api/user', formData)
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '2rem' }}>
      <h2>User Profile Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <TextField
          label="Full Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        {/* Email */}
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        {/* Date of Birth */}
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
              <TextField {...params} fullWidth margin="normal" variant="outlined" required />
            )}
          />
        </LocalizationProvider>

        {/* Professional Field */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="professional-field-label">Professional Field</InputLabel>
          <Select
            labelId="professional-field-label"
            id="professionalField"
            name="ProfessionalField"
            value={formData.ProfessionalField}
            label="Professional Field"
            onChange={handleChange}
            required
          >
            <MenuItem value="Software Engineering">Software Engineering</MenuItem>
            <MenuItem value="Telecommunication">Telecommunication</MenuItem>
            <MenuItem value="Data Science">Data Science</MenuItem>
            <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
