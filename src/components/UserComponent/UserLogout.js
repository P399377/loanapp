import React from "react";

import { useState } from "react";

import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  logoutButton: {
    bottom: "200px",
    right: "200px",
  },
}));

const logoutHandler = (setLoggedIn) => {
  // Remove the token from localStorage
  localStorage.removeItem("token");

  alert("Logout Successfully");
  // Update the loggedIn state
  setLoggedIn(false);
};
const UserLogout = () => {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      {loggedIn ? (
        <Link
          to={"/"}
          className="logout"
          onClick={() => logoutHandler(setLoggedIn)}
        >
          <Button
            className={classes.logoutButton}
            variant="contained"
            color="primary"
          >
            Logout
          </Button>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default UserLogout;
