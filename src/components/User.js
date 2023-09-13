import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserRequestLoan from "./UserComponent/UserRequestLoan";
import UserApproved from "./UserComponent/UserApproved";
import UserDeclined from "./UserComponent/UserDeclined";
import UserPaid from "./UserComponent/UserPaid";
import UserRepayment from "./UserComponent/UserRepayment";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: "#2196f3",
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "white",
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginRight: "16px",
  },
}));

const User = () => {
  // const navigate = useNavigate();
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className={classes.title}
          >
            Web App
          </Typography>
          <Link to="/user/" className={classes.link}>
            Request
          </Link>
          <Link to="/user/approved" className={classes.link}>
            Approved
          </Link>
          <Link to="/user/declined" className={classes.link}>
            Declined
          </Link>
          <Link to="/user/paid" className={classes.link}>
            Paid
          </Link>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<UserRequestLoan />} />
        <Route path="/approved" element={<UserApproved />} />
        <Route path="/declined" element={<UserDeclined />} />
        <Route path="/paid" element={<UserPaid />} />
        <Route path="/repayment/:loanId" element={<UserRepayment />} />
      </Routes>
    </div>
  );
};

export default User;
