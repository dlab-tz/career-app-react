import React, { useState } from 'react';
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem,
    Stack, Select, TextField, Typography,  } from '@mui/material';
import{LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const regions = [
  'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi',
  'Kigoma', 'Kilimanjaro', 'Lindi', 'Manyara', 'Mara', 'Mbeya', 'Morogoro',
  'Mtwara', 'Mwanza', 'Njombe', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga',
  'Simiyu', 'Singida', 'Songwe', 'Tabora', 'Tanga'
];

const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    educationLevel: '',
    region: '',
    professionalField: '',
    locationType: '',
    country: '',
  });

 const [locationType, setLocationType] = useState('');
const [country, setCountry] = useState('');
const [region, setRegion] = useState('');

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

    if (!formData.email || !formData.dateOfBirth || formData.dateOfBirth > new Date()) {
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
        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <TextField
                label="Phone"
                variant="outlined"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin='normal'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }}
                required
                type="tel"
                placeholder="10 digits"
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={(newValue) => {
                setFormData(prev => ({
                    ...prev,
                    dateOfBirth: newValue,
                }));
                }}
                renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" required />
                )}
            />
            </LocalizationProvider>

        </Stack>

  <FormControl fullWidth margin="normal">
   <InputLabel>Location Type</InputLabel>
    <Select
    label='Location Type'
    name='locationType'
    value={locationType}
    onChange={(e) => {
      setLocationType(e.target.value);
      setCountry('');
      setRegion('');
    }}
    required
   >
    <MenuItem value="in-country">In Country</MenuItem>
    <MenuItem value="overseas">Overseas</MenuItem>
  </Select>
</FormControl>

{locationType === 'overseas' && (
  <Autocomplete
    options={countries}
    value={country}
    onChange={(_, value) => setCountry(value)}
    renderInput={(params) => (
      <TextField {...params} label="Select Country" margin="normal" fullWidth required />
    )}
  />
)}

{locationType === 'in-country' && (
  <Autocomplete
    options={regions}
    value={region}
    onChange={(_, value) => setRegion(value)}
    renderInput={(params) => (
      <TextField {...params} label="Select Region" margin="normal" fullWidth required />
    )}
  />
)}


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
        {/* Professional Field */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="professional-field-label">Professional Field</InputLabel>
          <Select
            labelId="professional-field-label"
            id="professionalField"
            name="professionalField"
            value={formData.professionalField}
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
