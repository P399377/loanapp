import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "16px",
    overflow: "hidden",
    width: "900px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
  },
  button: {
    flex: "1",
    margin: "4px",
  },

  cardContent: {
    overflow: "hidden",
  },
}));

const statusHandler = async (loanId, setRequestData, str) => {
  const token = localStorage.getItem("token");
  try {
    await axios.put(
      `http://localhost:6034/loan/${str}`,
      {
        loanId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await axios.get("http://localhost:6034/loan/allPending", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRequestData(data.data.pending);

    toast.success("successful");
  } catch (err) {
    if (err.response) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Internal server error");
    }
  }
};

const AdminRequest = ({ name, loanId, amount, term, setRequestData }) => {
  const classes = useStyles(); // Initialize the custom styles

  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="div">
          Loan ID: {loanId}
        </Typography>
        <Typography variant="body1">Name of requester: {name}</Typography>
        <Typography variant="body1">Amount: ${amount}</Typography>
        <Typography variant="body1">Term: {term} Weeks</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={async () => {
            await statusHandler(loanId, setRequestData, "approve");
          }}
          fullWidth
          variant="contained"
          style={{ backgroundColor: "#4caf50", color: "white" }}
          className={classes.button}
        >
          Approve
        </Button>
        <Button
          onClick={async () => {
            await statusHandler(loanId, setRequestData, "decline");
          }}
          fullWidth
          variant="contained"
          style={{ backgroundColor: "#f44336", color: "white" }}
          className={classes.button}
        >
          Decline
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminRequest;
