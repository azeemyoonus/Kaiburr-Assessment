// Import Statements
"use client";
import DataList from "@/components/DataList";
import { Grid } from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TaskSearchByAssignee = () => {
  // Fetching tasks based on assignee
  const term = useParams<{ id: string }>();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}task/findTaskByAssignee?assignee=${term.id}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    // Fetch data only when the assignee ID is available
    if (term.id) {
      fetchData();
    }
  }, [term.id]);

  return (
    <>
      {/* Displaying search results in a grid */}
      <Grid sx={{ minHeight: "100vh", backgroundColor: "whitesmoke", p: 1 }}>
        <DataList tasks={searchResults} />
      </Grid>
    </>
  );
};

export default TaskSearchByAssignee;
