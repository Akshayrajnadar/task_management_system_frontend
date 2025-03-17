import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import Cookies from 'js-cookie';

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // Changed from `setuser` to `setUser` for consistency

  console.log('User:', user);
  console.log('Tasks:', tasks);

  useEffect(() => {
      getUserDetails();
  }, []);

  useEffect(() => {
      if (user && user.data._id) {
          fetchTasks();
      }
  }, [user]); // Runs when user is updated

  const getUserDetails = async () => {
    try {
      const email = Cookies.get('email');
      console.log("Email:", email);
      const res = await axios.post("http://localhost:3001/user/getUser", {
        email: email,
      });
      console.log("User details:", res.data);
      setUser(res.data); // Update state with user data
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchTasks = async () => {
    if (!user || !user._id) return; // Ensure user exists before making the request
    setLoading(true);
    try {
      const id = user._id;
      console.log('User ID:', id);
      const response = await axios.get(`http://localhost:3001/task/getTaskById/${id}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "In Progress":
        return "blue";
      case "Completed":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        Task Dashboard
      </Typography>

      {/* Show User Details */}
      {user ? (
        <Card sx={{ mb: 3, p: 2, textAlign: "center" }}>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="subtitle1">{user.email}</Typography>
        </Card>
      ) : (
        <CircularProgress sx={{ display: "block", margin: "auto", mb: 3 }} />
      )}

      {/* Show Tasks as Cards */}
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : tasks.length > 0 ? (
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: getStatusColor(task.status), fontWeight: "bold" }}>
                    Status: {task.status}
                  </Typography>
                  <Typography variant="body2">Due Date: {task.duedate}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ textAlign: "center", mt: 2 }}>No tasks found.</Typography>
      )}
    </Container>
  );
};
