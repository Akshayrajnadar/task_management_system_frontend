import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Name:", name, "Email:", email, "Password:", password);
    try{
    const res = await axios.post("http://localhost:5000/user/adduser", {
        name: name,
        email: email,
        password: password,
        role: "user",
    })
    console.log('Response:', res.data);
      setLoading(false)
      toast.success('Signing in successfully!', {
                                              position: "top-right",
                                              autoClose: 3000,
                                              hideProgressBar: true,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                              progress: undefined,
                                          });
      navigate('/login');
    } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('An error occured!', {
                                              position: "top-right",
                                              autoClose: 3000,
                                              hideProgressBar: true,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                              progress: undefined,
                                          });
        if (error.response) {
          console.error('Response details:', error.response);
        }
      }
  };

  return (
    <Container maxWidth="sm" sx={{ height: "74.9vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Name"
              type="text"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
          {loading? "Signing in..." : "Signin"}
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Already have an account? <a href="/signin">Sign In</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};


