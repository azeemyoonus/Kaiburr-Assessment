// Import Statements
"use client";
import { Grid } from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DataList from "@/components/DataList";

// Component to display tasks based on search by assignee
const SearchByAssignee = () => {
  // Get the assignee ID from the URL parameters
  const term = useParams<{ id: string }>();

  // State to store the search results
  const [searchResults, setSearchResults] = useState([]);

  // Log the assignee ID to the console for debugging
  console.log("params", term.id);

  // Fetch data when the assignee ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API request to fetch tasks by assignee name
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}task/findByName?name=${term.id}`
        );

        // Update the search results in the state
        setSearchResults(response.data);
      } catch (error) {
        // Log an error if fetching data fails
        console.error("Error fetching search results:", error);
      }
    };

    // Fetch data only when the assignee ID is available
    if (term.id) {
      fetchData();
    }
  }, [term.id]);

  // Render the component with a grid layout and DataList component
  return (
    <>
      <Grid sx={{ minHeight: "100vh", backgroundColor: "whitesmoke", p: 1 }}>
        {/* Display the search results using the DataList component */}
        <DataList tasks={searchResults} />
      </Grid>
    </>
  );
};

// Export the SearchByAssignee component as the default export
export default SearchByAssignee;
