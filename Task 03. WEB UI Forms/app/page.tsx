// Import Statements
"use client";
import DataList from "@/components/DataList";
import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

// Home component to display tasks
export default function Home() {
  // State to store tasks
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component mounts or when tasks state changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Make an API request to fetch tasks
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}task`
        );

        // Update the tasks in the state
        setTasks(response.data);
      } catch (error) {
        // Log an error if fetching tasks fails
        console.error("Error fetching tasks:", error);
      }
    };

    // Fetch tasks when the component mounts
    fetchTasks();
  }, [tasks]);

  // Render the component with a grid layout and DataList component
  return (
    <Grid sx={{ minHeight: "100vh", backgroundColor: "whitesmoke", p: 1 }}>
      {/* Display the tasks using the DataList component */}
      <DataList tasks={tasks} />
    </Grid>
  );
}
