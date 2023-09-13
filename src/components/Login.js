import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Create an object with login data
      const loginData = {
        email: email,
        password: password,
      };

      // Make a POST request to your login API endpoint
      const response = await axios.post(
        "http://localhost:6034/user/login",
        loginData
      );

      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem("token", token);
      toast.success("Login successful");

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      // Handle login error (e.g., show an error message)
      console.error("Login failed:", error);
    }
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
          <Typography variant="h4">Login</Typography>
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
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          <Typography variant="body1">
            Don't have an account? <Link to="/">Sign up</Link>
          </Typography>
        </div>
      </Box>
    </Container>
  );
};

export default Login;
