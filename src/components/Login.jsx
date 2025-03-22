import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const fetchId = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3001/user/userid");
  //   }catch(error) {
  //     console.error('Error fetching user id:', error);
  //   }
  // }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log("Email:", email, "Password:", password);
      Cookies.remove('userid');
      Cookies.remove('email');
      const res = await axios.post("http://localhost:3001/user/userlogin", {
        email: email,
        password: password,
      })
      Cookies.set('email', email)
      console.log('Response:', res.data);
      setLoading(false)
      toast.success('Loging in successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/dashbord');
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account? <a href="/signup">Sign Up</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

