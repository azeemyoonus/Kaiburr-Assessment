// Import Statements
"use client";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as React from "react";

// FormDialog component for creating tasks
export default function FormDialog() {
  // API URL for task operations
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // State to manage the dialog's open/close status
  const [open, setOpen] = React.useState(false);

  // Function to handle opening the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to handle task creation
  const handleTaskCreate = (formData: any) => {
    axios
      .post(`${apiUrl}task/create`, formData)
      .then((response) => {
        console.log("Task created successfully:", response.data);
        alert("Task created successfully");
      })
      .catch((error) => {
        console.error("Error creating task:", error);
        alert("Error creating task");
      });

    // Close the dialog after task creation
    setOpen(false);
  };

  // Function to handle closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* Button to open the dialog */}
      <Button
        variant="outlined"
        color="success"
        sx={{ color: "#515643", borderColor: "#515643" }}
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Create Task
      </Button>

      {/* Dialog for creating tasks */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            handleTaskCreate(formJson);
          },
        }}
      >
        {/* Dialog Title */}
        <DialogTitle>Create Task</DialogTitle>

        {/* Dialog Content with form fields */}
        <DialogContent>
          {/* Add your form fields here */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="id"
            name="id"
            label="Task Id"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="assignee"
            name="assignee"
            label="Assignee"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="project"
            name="project"
            label="Project"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="startTime"
            name="startTime"
            label="Start Time"
            type="datetime-local"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                min: new Date().toISOString().slice(0, 16), // Set min date to current date
              },
            }}
            // helperText="Please enter the Start Time in the format: YYYY-MM-DDTHH:mm"
          />
        </DialogContent>
        {/* Dialog Actions with buttons */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
