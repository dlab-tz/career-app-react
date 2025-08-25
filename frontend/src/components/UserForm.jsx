import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack, Autocomplete, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

const regions = ["Arusha", "Dar es Salaam", "Dodoma", "Geita"];
const districtsByRegion = { Arusha: ["Arusha City", "Arusha District"] };
const professionalFields = ["Software Engineering", "Telecommunication", "Data Science"];
const countries = ["Tanzania", "Kenya", "Uganda", "USA", "UK"];

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", dateOfBirth: null,
    region: "", district: "", professionalField: "", country: ""
  });
  const [districtOptions, setDistrictOptions] = useState([]);
  const [isOversea, setIsOversea] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.email || !formData.dateOfBirth || !/^\d{10}$/.test(formData.phone)) {
      alert("Please fill form correctly");
      return;
    }
    console.log("Submitted:", formData);
  }

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#42a5f5,#ff7043)"
    }}>
      <Box sx={{
        width: 500,
        bgcolor: "rgba(255,255,255,0.95)",
        p: 5,
        borderRadius: 4,
        boxShadow: 12,
        backdropFilter: "blur(10px)",
      }}>
        <Typography variant="h4" sx={{ color: "#ff7043", fontWeight: "bold", mb: 4, textAlign: "center" }}>User Profile Form</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth required
              sx={{ borderRadius: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 }}}/>
            <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth required
              sx={{ borderRadius: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 }}}/>
            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth required
              sx={{ borderRadius: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 }}}/>
            <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth placeholder="10 digits" required
              sx={{ borderRadius: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 }}}/>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker label="Date of Birth" value={formData.dateOfBirth} disableFuture
                onChange={newValue => setFormData(prev => ({ ...prev, dateOfBirth: newValue }))}
                renderInput={params => <TextField {...params} fullWidth required sx={{ borderRadius: 2 }}/>}
              />
            </LocalizationProvider>

            <Autocomplete options={regions} value={formData.region || ""} 
              onChange={(e, newValue) => {
                setFormData(prev => ({ ...prev, region: newValue, district: "" }));
                setDistrictOptions(newValue ? districtsByRegion[newValue] || [] : []);
              }}
              renderInput={params => <TextField {...params} label="Region" fullWidth sx={{ borderRadius: 2 }}/>}
            />

            {districtOptions.length > 0 &&
              <Autocomplete options={districtOptions} value={formData.district || ""}
                onChange={(e, newValue) => setFormData(prev => ({ ...prev, district: newValue }))}
                renderInput={params => <TextField {...params} label="District" fullWidth sx={{ borderRadius: 2 }}/>}
              />
            }

            <FormControlLabel control={<Checkbox checked={isOversea} onChange={e => setIsOversea(e.target.checked)} />} label="Are you overseas?" />
            {isOversea &&
              <Autocomplete options={countries} value={formData.country}
                onChange={(e, newValue) => setFormData(prev => ({ ...prev, country: newValue }))}
                renderInput={params => <TextField {...params} label="Country" fullWidth sx={{ borderRadius: 2 }}/>}
              />
            }

            <FormControl fullWidth>
              <InputLabel>Professional Field</InputLabel>
              <Select value={formData.professionalField} name="professionalField" onChange={handleChange} required
                sx={{ borderRadius: 2 }}>
                {professionalFields.map(field => <MenuItem key={field} value={field}>{field}</MenuItem>)}
              </Select>
            </FormControl>

            <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
              <Button type="submit" sx={{
                width: "50%", py: 1.5, fontWeight: "bold",
                background: "linear-gradient(45deg,#42a5f5,#ff7043)",
                color: "white", borderRadius: 3,
                "&:hover": { background: "linear-gradient(45deg,#ff7043,#42a5f5)" }
              }}>Submit</Button>

              <Button variant="contained" onClick={() => navigate("/admin-login")} sx={{
                width: "50%", py: 1.5, fontWeight: "bold",
                background: "#ff7043", color: "white",
                borderRadius: 3, "&:hover": { background: "#ff5722" }
              }}>Admin Login</Button>
            </Stack>

          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default UserForm;
