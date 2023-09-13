import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Container,
  Box,
} from "@mui/material";

const Registration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSignup = async () => {
    try {
      // Create an object with the signup data
      const userData = {
        name: name,
        email: email,
        password: password,
        role: role,
      };

      // Make a POST request to your API endpoint using async/await
      const response = await axios.post(
        "http://localhost:6034/user/register",
        userData
      );

      // Handle success (e.g., show a success message or redirect to login)
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Signup failed:", error);
    }
    navigate("/login");
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <div>
          <Typography variant="h4">Sign Up</Typography>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Role"
            select
            fullWidth
            value={role}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="user">user</MenuItem>
            <MenuItem value="admin">admin</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" onClick={handleSignup}>
            Sign Up
          </Button>
          <Typography variant="body1">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </div>
      </Box>
    </Container>
  );
};

export default Registration;
