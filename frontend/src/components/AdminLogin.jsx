import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (!username || !password) { alert("Please enter both username and password"); return; }
    if (username === "admin" && password === "admin123") {
      alert("Admin login successful!");
      navigate("/");
    } else { alert("Invalid credentials"); }
  };

  return (
    <Box sx={{
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"linear-gradient(135deg, #42a5f5, #ff7043)"
    }}>
      <Box sx={{
        width:400,
        bgcolor:"white",
        borderRadius:3,
        boxShadow:8,
        p:5,
        textAlign:"center"
      }}>
        <Typography variant="h4" sx={{ color:"#ff7043", fontWeight:"bold", mb:4 }}>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField label="Username" name="username" value={credentials.username} onChange={handleChange} fullWidth required />
            <TextField label="Password" name="password" type="password" value={credentials.password} onChange={handleChange} fullWidth required />

            <Button type="submit" sx={{
              mt:2,
              width:"100%",
              py:1.5,
              fontWeight:"bold",
              background:"linear-gradient(45deg,#42a5f5,#ff7043)",
              color:"white",
              "&:hover":{background:"linear-gradient(45deg,#ff7043,#42a5f5)"} 
            }}>
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AdminLogin;
