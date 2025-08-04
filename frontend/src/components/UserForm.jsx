import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
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
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      alert('Please enter a valid email address');
      return;
    }

    console.log('Submitted:', formData);
    // TODO: send formData to backend via API call
  };

  return (
    <Box sx={{ maxWidth: '700px', margin: 'auto', padding: 3 }}>
      <Typography variant="h5" gutterBottom>User Profile Form</Typography>
      <form onSubmit={handleSubmit}>

        <TextField
          label="First Name"
          variant="outlined"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />

        <TextField
          label="Middle Name"
          variant="outlined"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />

        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
          type="email"
        />

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
              <TextField {...params} fullWidth margin="normal" required />
            )}
          />
        </LocalizationProvider>

        {/* Submit Button - stays at the bottom */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserForm;
