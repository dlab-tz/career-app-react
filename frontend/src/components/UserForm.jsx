import React, { useState } from 'react';
import {
  Autocomplete, Box, Button, FormControl, InputLabel, MenuItem,
 Select, TextField, Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./UserForm.css";

const regions = [
  'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi',
  'Kigoma', 'Kilimanjaro', 'Lindi', 'Manyara', 'Mara', 'Mbeya', 'Morogoro',
  'Mtwara', 'Mwanza', 'Njombe', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga',
  'Simiyu', 'Singida', 'Songwe', 'Tabora', 'Tanga'
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
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
    console.log('Submitted:', formData);
    // TODO: send formData to backend via API call
  };

  return (
    <Box className="user-form-container">
      <Typography variant="h5" className="user-form-title">
        User Profile Form
      </Typography>
      <form onSubmit={handleSubmit} className="user-form">
        <TextField
          label="First Name"
          variant="outlined"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className='form-field'
        />
        <TextField
          label="Middle Name"
          variant="outlined"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
           className='form-field'
        />
        <TextField
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
           className='form-field'
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          type="email"
           className='form-field'
        />
        <div className="user-form-row">
          <TextField
            label="Phone"
            variant="outlined"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            inputProps={{ maxLength: 10 }}
            required
            type="tel"
            placeholder="10 digits"
             className='form-field'
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
                <TextField {...params} required  />
              )}
            />
          </LocalizationProvider>
        </div>
        <Autocomplete
          freeSolo
          options={regions}
          onChange={(event, newValue) => {
            setFormData(prev => ({
              ...prev,
              region: newValue,
            }));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Region" variant="outlined"  className='form-field'/>
          )}
        />
        <FormControl fullWidth   className='form-field'>
          <InputLabel id="education-level-label" className='form-field'>Education Level</InputLabel>
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
        <FormControl fullWidth   className='form-field'>
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
        <div className="user-form-submit">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default UserForm;









// import React, { useState } from 'react';
// import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem,
//     Stack, Select, TextField, Typography,  } from '@mui/material';
// import{LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// const regions = [
//   'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi',
//   'Kigoma', 'Kilimanjaro', 'Lindi', 'Manyara', 'Mara', 'Mbeya', 'Morogoro',
//   'Mtwara', 'Mwanza', 'Njombe', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga',
//   'Simiyu', 'Singida', 'Songwe', 'Tabora', 'Tanga'
// ];


// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     dateOfBirth: null,
//     educationLevel: '',
//     region: '',
//     professionalField: '',
//   });


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'phone') {
//       // Only allow numbers, max 10 digits
//       if (!/^\d*$/.test(value)) return;
//       if (value.length > 10) return;
//     }
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.dateOfBirth || formData.dateOfBirth > new Date()) {
//       alert('Please fill in Email and Date of Birth correctly');
//       return;
//     }

//     if (!formData.email.includes('@') || !formData.email.includes('.')) {
//       alert('Please enter a valid email address');
//       return;
//     }
//     if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
//       alert('Please enter a valid 10-digit phone number');
//       return;
//     }
//     if (!formData.educationLevel) {
//       alert('Please select your education level');
//       return;
//     }
//     console.log('Submitted:', formData);
//     // TODO: send formData to backend via API call
//   };

//   return (
//     <Box sx={{ maxWidth: '700px', margin: 'auto', padding: 3 }}>
//       <Typography variant="h5" gutterBottom>User Profile Form</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="First Name"
//           variant="outlined"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           margin="normal"
//           fullWidth
//           required
//         />
//         <TextField
//           label="Middle Name"
//           variant="outlined"
//           name="middleName"
//           value={formData.middleName}
//           onChange={handleChange}
//           margin="normal"
//           fullWidth
//         />
//         <TextField
//           label="Last Name"
//           variant="outlined"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           margin="normal"
//           fullWidth
//           required
//         />
//         <TextField
//           label="Email"
//           variant="outlined"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           margin="normal"
//           fullWidth
//           required
//           type="email"
//         />
//         <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
//             <TextField
//                 label="Phone"
//                 variant="outlined"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 margin='normal'
//                 inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }}
//                 required
//                 type="tel"
//                 placeholder="10 digits"
//             />

//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//                 label="Date of Birth"
//                 value={formData.dateOfBirth}
//                 onChange={(newValue) => {
//                 setFormData(prev => ({
//                     ...prev,
//                     dateOfBirth: newValue,
//                 }));
//                 }}
//                 renderInput={(params) => (
//                 <TextField {...params} fullWidth margin="normal" required />
//                 )}
//             />
//             </LocalizationProvider>

//         </Stack>
//         <Autocomplete
//             freeSolo
//             options={regions} // 
//             onChange={(event, newValue) => {
//               setFormData(prev => ({
//                 ...prev,
//                 region: newValue,
//               }));
//             }}
//             renderInput={(params) => (
//                 <TextField {...params} label="Region"  margin="normal" variant="outlined" fullWidth />
//             )}
//         />
//           <FormControl fullWidth margin="normal">
//             <InputLabel id="education-level-label">Education Level</InputLabel>
//             <Select
//               labelId="education-level-label"
//               id="educationLevel"
//               name="educationLevel"
//               value={formData.educationLevel}
//               label="Education Level"
//               onChange={handleChange}
//               required
//             >
//               <MenuItem value=""><em>None</em></MenuItem>
//               <MenuItem value="Standard 7">Standard 7</MenuItem>
//               <MenuItem value="O Level">O Level</MenuItem>
//               <MenuItem value="A Level">A Level</MenuItem>
//               <MenuItem value="Diploma">Diploma</MenuItem>
//               <MenuItem value="Degree">Degree</MenuItem>
//               <MenuItem value="Masters">Masters</MenuItem>
//               <MenuItem value="PhD">PhD</MenuItem>
//               <MenuItem value="Professor">Professor</MenuItem>
//             </Select>
//           </FormControl>
//         {/* Professional Field */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel id="professional-field-label">Professional Field</InputLabel>
//           <Select
//             labelId="professional-field-label"
//             id="professionalField"
//             name="professionalField"
//             value={formData.professionalField}
//             label="Professional Field"
//             onChange={handleChange}
//             required
//           >
//             <MenuItem value="Software Engineering">Software Engineering</MenuItem>
//             <MenuItem value="Telecommunication">Telecommunication</MenuItem>
//             <MenuItem value="Data Science">Data Science</MenuItem>
//             <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Submit Button - stays at the bottom */}
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//           >
//             Submit
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default UserForm;
