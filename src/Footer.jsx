import React, { useState } from "react";
import { Typography, Box, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

export const Footer = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: "#1976d2", color: "white", py: 3, mt: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">TMS</Typography>
                <Typography variant="body2">Reliable Task Management System</Typography>
              </Grid>
    
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Quick Links</Typography>
                <Link href="/" color="inherit" underline="none" display="block">Home</Link>
                <Link href="/aboutus" color="inherit" underline="none" display="block">About Us</Link>
                <Link href="/contactus" color="inherit" underline="none" display="block">Contact Us</Link>
              </Grid>
    
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Follow Us</Typography>
                <Typography variant="body2">Stay connected on social media.</Typography>
              </Grid>
            </Grid>
    
            <Box mt={3} textAlign="center">
              <Typography variant="body2">&copy; {new Date().getFullYear()} Greenways Shipping. All rights reserved.</Typography>
            </Box>
          </Container>
        </Box>
      );
};

 
