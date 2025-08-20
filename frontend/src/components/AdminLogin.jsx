import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = credentials;

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    // TODO: Replace with real admin authentication API
    if (username === "admin" && password === "admin123") {
      alert("Admin login successful!");
      navigate("/"); // Redirect to home/dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box sx={{ maxWidth: "400px", margin: "auto", padding: 3, mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Admin Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AdminLogin;
