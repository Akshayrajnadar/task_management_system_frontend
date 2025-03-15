import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

export const About = () => {
  return (
    <Container maxWidth="md" sx={{ height: "74.9vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to Greenways Shipping! We are a trusted logistics and customs clearance company, dedicated to providing seamless shipping solutions for businesses and individuals.
        </Typography>
        <Typography variant="body1" paragraph>
          With years of experience in the industry, we specialize in efficient freight forwarding, hassle-free customs clearance, and reliable transportation services. Our team ensures that your shipments are handled with utmost care and delivered on time.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to simplify global trade by offering innovative logistics solutions tailored to our clients' needs. Whether you are importing or exporting goods, we are here to help you navigate the complexities of international shipping.
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for choosing Greenways Shipping. We look forward to serving you!
        </Typography>
      </Paper>
    </Container>
  );
};


