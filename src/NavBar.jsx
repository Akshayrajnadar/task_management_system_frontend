import React, { useState } from "react";
import { AppBar,Box, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const navItems = [
      { label: "Home", path: "/" },
      { label: "About Us", path: "/aboutus" },
      { label: "Contact Us", path: "/contactus" },
    ];
  
    return (
      <>
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar>
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "white", flexGrow: 1 }}
            >
              Greenways Shipping
            </Typography>
  
            {/* Center Navigation */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2, justifyContent: "center", flexGrow: 2 }}>
              {navItems.map((item) => (
                <Button key={item.label} color="inherit" component={Link} to={item.path}>
                  {item.label}
                </Button>
              ))}
            </Box>
  
            {/* Sign In & Sign Up */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
              <Button color="inherit" component={Link} to="/signin">Sign In</Button>
              <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
            </Box>
  
            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              edge="end"
              sx={{ display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
  
        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ "& .MuiDrawer-paper": { width: 240 } }}
        >
          <List>
            {[...navItems, { label: "Sign In", path: "/signin" }, { label: "Sign Up", path: "/signup" }].map((item) => (
              <ListItem button key={item.label} component={Link} to={item.path} onClick={handleDrawerToggle}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </>
    );
};

