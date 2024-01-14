// Import Statements
"use client";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Grid, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import FormDialog from "./FormDialog";

// Header component for the application
export default function Header() {
  // Next.js router hook
  const router = useRouter();

  // Options for the search dropdown
  const options = ["search BY name", "search by assigne (Top 10)", "Find All"];

  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // State for handling dropdown menu
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  // Function to handle search and navigation
  const handleClick = async () => {
    // Check if the search term is empty
    if (!searchTerm.trim()) {
      // You can show an alert or handle it as needed
      return;
    }

    try {
      // Handle navigation based on the selected index
      switch (selectedIndex) {
        case 0:
          router.push(`/search-by-name/${searchTerm}`);
          break;

        case 1:
          router.push(`/search-by-assignee/${searchTerm}`);
          break;

        case 2:
          router.replace("/");
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error searching tasks:", error);
    }
  };

  // Function to handle menu item click
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  // Function to handle toggle for the dropdown menu
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // Function to handle closing the dropdown
  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container>
      {/* Application Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: "whitesmoke", boxShadow: 1 }}>
        {/* Toolbar */}
        <Toolbar>
          {/* Logo/Title */}
          <Grid item xs={2} md={4}>
            <Typography
              sx={{
                fontSize: { xs: 25, md: 35 },
                fontWeight: 400,
                color: "#515643",
                px: 2,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => router.push("/")}
            >
              Task
            </Typography>
          </Grid>

          {/* Search Input and Dropdown */}
          <Grid item xs={8} md={6}>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "flex",
                  md: "flex",
                  flexDirection: "contents",
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Center vertically
                },
              }}
            >
              <TextField
                label="Search Tasks"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Dropdown for search options */}
              <React.Fragment>
                <ButtonGroup
                  variant="outlined"
                  ref={anchorRef}
                  size="small"
                  aria-label="split button"
                  sx={{ p: 0, m: 1 }}
                >
                  {/* Button for selected option */}
                  <Button
                    onClick={handleClick}
                    color="success"
                    sx={{ color: "#515643", borderColor: "#515643" }}
                  >
                    {options[selectedIndex]}
                  </Button>
                  {/* Button for dropdown arrow */}
                  <Button
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    color="success"
                    sx={{ color: "#515643", borderColor: "#515643" }}
                    onClick={handleToggle}
                  >
                    <ArrowDropDownIcon />
                  </Button>
                </ButtonGroup>
                {/* Popper for dropdown menu */}
                <Popper
                  sx={{
                    zIndex: 1,
                  }}
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      {/* Paper container for dropdown */}
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          {/* Menu list for dropdown options */}
                          <MenuList id="split-button-menu" autoFocusItem>
                            {options.map((option, index) => (
                              <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) =>
                                  handleMenuItemClick(event, index)
                                }
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </React.Fragment>
            </Box>
          </Grid>

          {/* Action Button (Create Task) */}
          <Grid item xs={2} md={2}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {/* Component for creating a new task */}
                <FormDialog />
              </Box>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
