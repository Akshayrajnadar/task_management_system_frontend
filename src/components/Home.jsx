import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Container maxWidth="md" sx={{ height: "74.9vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Task Management System
        </Typography>
        <Typography variant="body1" paragraph>
          Organize your work efficiently with our Task Management System. Create, update, delete, and track your tasks seamlessly.
        </Typography>
        <Typography variant="body1" paragraph>
          Our system supports role-based access control, allowing administrators to manage users while ensuring secure authentication and authorization.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary" component={Link} to="/signup" sx={{ marginRight: 2 }}>
            Get Started
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/signin">
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};


