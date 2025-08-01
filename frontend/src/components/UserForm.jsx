import React, { useState } from 'react';
import { TextField,select,  InputLabel, FormControl, Autocomplete } from '@mui/material';
import{LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const regions = [
  'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi',
  'Kigoma', 'Kilimanjaro', 'Lindi', 'Manyara', 'Mara', 'Mbeya', 'Morogoro',
  'Mtwara', 'Mwanza', 'Njombe', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga',
  'Simiyu', 'Singida', 'Tabora', 'Tanga'
];


const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    DateOfBirth: null,
  });
  const [inputValue, setInputValue] = useState ('');

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
  <Autocomplete
  freeSolo
  options={regions} // 
  inputValue={inputValue}
  onInputChange={(e, newInputValue) => {
    setInputValue(newInputValue);
  }}
  renderInput={(params) => (
    <TextField {...params} label="Region" variant="outlined" fullWidth />
  )}
/>


          
  
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
