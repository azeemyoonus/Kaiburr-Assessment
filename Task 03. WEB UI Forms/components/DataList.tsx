// Import Statements
"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect } from "react";

// Interface to define the props for DataList
interface DataListProps {
  tasks: any
}

// DataList component to display a table of tasks
function DataList({ tasks }: DataListProps) {
  // API URL for task operations
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Function to handle task deletion
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios
        .delete(`${apiUrl}task/delete/${id}`)
        .then(() => {
          alert(`Task with ID ${id} deleted successfully`);
          // You may want to fetch tasks again after deletion
          // fetchTasks(setTasks);
        })
        .catch((error) => {
          alert(`Error deleting task with ID ${id}:  ${error}`);
        });
    }
  };

  return (
    <>
      {/* Grid container with styling */}
      <Grid container sx={{ pt: 10, backgroundColor: "whitesmoke" }}>
        {/* TableContainer and Table components for displaying tasks */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {/* TableHead with column headers */}
            <TableHead>
              <TableRow>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Assignee</TableCell>
                <TableCell align="right">Project</TableCell>
                <TableCell align="right">Start Time</TableCell>
                <TableCell align="right">azeemYoonusProperty</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            {/* TableBody with conditional rendering based on tasks existence */}
            <TableBody>
              {tasks?.length > 0 ? (
                // Mapping through tasks to create TableRow components
                tasks.map((task: any) => (
                  <TableRow
                    key={task?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* TableCell components for each task property */}
                    <TableCell component="th" scope="row" align="right">
                      {task?.id}
                    </TableCell>
                    <TableCell align="right">{task?.name}</TableCell>
                    <TableCell align="right">{task?.assignee}</TableCell>
                    <TableCell align="right">{task?.project}</TableCell>
                    <TableCell align="right">{task?.startTime}</TableCell>
                    <TableCell align="right">
                      {task?.azeemYoonusProperty}
                    </TableCell>
                    {/* IconButton for task deletion */}
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(task?.id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                // Displaying a message if no tasks are present
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No Records Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

// Exporting the DataList component
export default DataList;
