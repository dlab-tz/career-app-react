import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Autocomplete, Checkbox, Grid, Box, Button, FormControl, InputLabel, MenuItem,
    Stack, Select, TextField, Typography,
    FormControlLabel,  } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

const regions = [
  'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi',
  'Kigoma', 'Kilimanjaro', 'Lindi', 'Manyara', 'Mara', 'Mbeya', 'Morogoro',
  'Mtwara', 'Mwanza', 'Njombe', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga',
  'Simiyu', 'Singida', 'Songwe', 'Tabora', 'Tanga'
];
  const districtsByRegion = {
      Arusha: ["Arusha City", "Arusha District", "Karatu", "Longido", "Meru", "Monduli", "Ngorongoro"],
  "Dar es Salaam": ["Ilala Municipal", "Kinondoni Municipal", "Temeke Municipal", "Kigamboni Municipal", "Ubungo Municipal"],
  Dodoma: ["Bahi", "Chamwino", "Chemba", "Dodoma Municipal", "Kondoa", "Kongwa", "Mpwapwa"],
  Geita: ["Geita", "Geita Town", "Bumbuli", "Kyerwa", "Mbogwe", "Nyang'hwale"],
  Iringa: ["Iringa District", "Iringa Municipal", "Kilolo", "Ludewa", "Mufindi"],
  Kagera: ["Biharamulo", "Bukoba District", "Bukoba Municipal", "Chato", "Karagwe", "Kyerwa", "Muleba", "Ngara"],
  Katavi: ["Mpanda District", "Mpanda Municipal", "Mlele"],
  Kigoma: ["Kasulu District", "Kasulu Town", "Kakonko", "Kibondo", "Kigoma District", "Kigoma Ujiji", "Uvinza"],
  Kilimanjaro: ["Hai", "Moshi District", "Moshi Municipal", "Mwanga", "Rombo", "Same", "Siha"],
  Lindi: ["Kilwa", "Lindi District", "Lindi Municipal", "Liwale", "Nachingwea", "Ruangwa"],
  Manyara: ["Babati District", "Babati Town", "Hanang", "Kiteto", "Mbulu", "Simanjiro"],
  Mara: ["Bunda District", "Bunda Town", "Butiama", "Musoma District", "Musoma Municipal", "Rorya", "Serengeti", "Tarime District", "Tarime Town"],
  Mbeya: ["Chunya", "Ileje", "Kyela", "Mbarali", "Mbeya District", "Mbeya City", "Mbozi", "Rungwe"],
  Morogoro: ["Gairo", "Kilombero", "Kilosa", "Morogoro District", "Morogoro Municipal", "Mvomero", "Ulanga"],
  Mtwara: ["Masasi District", "Masasi Town", "Mtwara District", "Mtwara Municipal", "Nanyumbu", "Newala District", "Newala Town", "Tandahimba"],
  Mwanza: ["Geita District", "Ilemela", "Kwimba", "Magu", "Misungwi", "Mwanza District", "Nyamagana", "Sengerema", "Ukerewe"],
  Njombe: ["Iringa District", "Makambako Town", "Njombe District", "Njombe Town", "Wanging’ombe", "Njombe (others)"],
  "Pemba North": ["Micheweni", "Wete"],
  "Pemba South": ["Chake Chake", "Mkoani"],
  Pwani: ["Bagamoyo", "Kibaha District", "Kibaha Town", "Kisarawe", "Mkuranga", "Rufiji", "Mafia"],
  Rukwa: ["Kalambo", "Mpanda District", "Mpanda Municipal", "Nkasi", "Sumbawanga District", "Sumbawanga Municipal"],
  Ruvuma: ["Mbinga", "Mbinga Town", "Namtumbo", "Rufiji", "Songea District", "Songea Municipal", "Tunduru"],
  Shinyanga: ["Bariadi District", "Bariadi Town", "Bukombe", "Kahama Town", "Maswa", "Meatu", "Shinyanga District", "Shinyanga Municipal"],
  Simiyu: ["Bariadi", "Busega", "Itilima", "Maswa", "Meatu"],
  Singida: ["Iramba", "Itigi", "Manyoni", "Singida District", "Singida Municipal"],
  Songwe: ["Ileje", "Mbozi", "Momba", "Songwe District", "Tunduma Town"],
  Tabora: ["Igunga", "Kaliua", "Nzega", "Tabora District", "Tabora Municipal", "Urambo", "Uyui"],
  Tanga: ["Bumbuli", "Handeni", "Handeni Town", "Kilindi", "Korogwe District", "Korogwe Town", "Lushoto", "Muheza", "Mkinga", "Pangani", "Tanga District", "Tanga City"],
  "Zanzibar North": ["Kaskazini A", "Kaskazini B"],
  "Zanzibar South": ["Kati", "Kusini"],
  "Zanzibar West": ["Mjini", "Magharibi"]
};



const professionalFields = [
  "Software Engineering", "Telecommunication", "Data Science", "Electrical Engineering",
  "Civil Engineering", "Mechanical Engineering", "Architecture", "Medicine",
  "Nursing", "Pharmacy", "Law", "Accounting", "Finance", "Business Administration",
  "Marketing", "Education", "Psychology", "Environmental Science", "Agriculture", "Research"
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
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    educationLevel: '',
    region: '',
    district: '', 
    professionalField: '',
    country: '',
  });

 const [districtOptions, setDistrictOptions] = useState([]);
 const [isOversea, setIsOversea] = useState(false);
 const notToSelect = ["Tanzania"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      if (!/^\d*$/.test(value)) return; // allow only numbers
      if (value.length > 10) return; // max 10 digits
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validations
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
    // TODO: send formData to backend API
  };

  const handleAdminLogin = () => {
    navigate("/admin-login");
  };

  return (
    <Box sx={{ maxWidth: '700px', margin: 'auto', padding: 3 }}>
      <Typography variant="h5" gutterBottom>User Profile Form</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Middle Name"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="tel"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }}
            placeholder="10 digits"
            required
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Date of Birth"
                value={formData.dateOfBirth}
                disableFuture
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
        <Autocomplete
  options={regions}
  value={formData.region || ''}
  onChange={(event, newValue) => {
    setFormData(prev => ({ ...prev, region: newValue, district: '' })); // reset district
    setDistrictOptions(newValue ? districtsByRegion[newValue] || [] : []);
  }}
  renderInput={(params) => (
    <TextField {...params} label="Region" margin="normal" variant="outlined" fullWidth />
  )}
/>

{formData.region && districtOptions.length > 0 && (
  <Autocomplete
    options={districtOptions}
    value={formData.district || ''}
    onChange={(e, newValue) => setFormData(prev => ({ ...prev, district: newValue }))}
    renderInput={(params) => (
      <TextField {...params} label="District" margin="normal" variant="outlined" fullWidth />
    )}
  />
)}

<Box>
  <FormControlLabel
          control={
            <Checkbox
            checked={isOversea}
            onChange={(e) => setIsOversea(e.target.checked)}
            />
          }
          label = "Are you overseas?"
          />
        </Box>
        {
          isOversea && (
                <Autocomplete
           
            options={countries} // 
            onChange={(newValue) => {
              setFormData(prev => ({
                ...prev,
                country: newValue,
              }));
            }}
            renderInput={(params) => (
                <TextField {...params} label="Country"  margin="normal" variant="outlined" fullWidth
                 />
            )}
        />
          )
        }


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
            name="professionalField"
            value={formData.professionalField}
            onChange={handleChange}
            required
          >
            {professionalFields.map(field => (
              <MenuItem key={field} value={field}>{field}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button type="button" variant="contained" color="secondary" onClick={handleAdminLogin}>
            Admin Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UserForm;
