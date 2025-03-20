import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Select, MenuItem } from "@mui/material";
import Cookies from 'js-cookie';

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]); // Runs when user is updated

  const getUserDetails = async () => {
    try {
        const email = Cookies.get('email');
        if (!email) {
            console.error("No email found in cookies");
            return;
        }

        console.log("Email:", email);
        const res = await axios.post("http://localhost:3001/user/getUser", { email });

        if (res.data && res.data.data) {
            console.log("User details:", res.data.data._id);
            Cookies.set("userid", res.data.data._id);
            setUser(res.data.data); // Correctly setting user with extracted data
        } else {
            console.error("Invalid user response:", res.data);
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};

const fetchTasks = async () => {
  console.log("Got inside the fetchTasks function");
  if (!user || !user._id) return;

  setLoading(true);
  try {
      const userid = Cookies.get('userid');
      if (!userid) {
          console.error("No user ID found in cookies");
          return;
      }
      console.log("Fetching tasks for User ID:", userid);
      const response = await axios.get(`http://localhost:3001/task/gettaskId/${userid}`);

      if (response.data && response.data.data) {
          // Ensure default status is "Pending" if not set
          const updatedTasks = response.data.data.map(task => ({
            ...task,
            status: task.status || "Pending"
          }));
          setTasks(updatedTasks);
      } else {
          console.error("Invalid tasks response:", response.data);
          setTasks([]); // Ensure no error if no tasks found
      }

      // Remove cookies only after successfully fetching tasks
      Cookies.remove('userid');
      Cookies.remove('email');
  } catch (error) {
      console.error("Error fetching tasks:", error);
  }
  setLoading(false);
};

const updateTaskStatus = async (taskId, newStatus) => {
  try {
    // Optimistically update the UI
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Send update request to the backend
    await axios.put(`http://localhost:3001/task/updatetask/${taskId}`, { status: newStatus });

    // Fetch updated tasks to ensure UI reflects backend changes
    fetchTasks();
  } catch (error) {
    console.error("Error updating task status:", error);
  }
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
                  Status: 
                  <Select
                    value={task.status || "Pending"} // Default to "Pending"
                    onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
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
