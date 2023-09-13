import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  TextField,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

// Function for handling the adding of the loan request.
const addRequestHandler = async (amount, term, setLoanRequests) => {
  try {
    const loanData = {
      amount: amount,
      term: term,
    };
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:6034/loan/request", loanData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const pending = await axios.get("http://localhost:6034/loan/pending", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoanRequests(pending.data.pending);

    toast.success(
      "Now create an admin account and login from it and approve the loan request to make repayment of the loan"
    );
  } catch (err) {
    if (err.response) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Internal Server error");
    }
  }
};

const UserRequestLoan = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const pendingData = async () => {
      try {
        const pending = await axios.get("http://localhost:6034/loan/pending", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoanRequests(pending.data.pending);
      } catch (err) {
        console.log(err);
      }
    };
    pendingData();
  }, [token]);

  const handleAddRequest = () => {
    addRequestHandler(amount, term, setLoanRequests);
    setAmount(""); // Clear the input fields after adding a request
    setTerm("");
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <div>
          <Typography variant="h4">Request Loan</Typography>
          <TextField
            label="Amount"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Term"
            type="number"
            fullWidth
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            margin="normal"
          />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddRequest}
            >
              Request Loan
            </Button>

            <Box mt={2}>
              {" "}
              <Link to="/">
                <Button
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                  variant="contained"
                  color="secondary"
                >
                  Logout
                </Button>
              </Link>
            </Box>
          </Box>
        </div>
      </Box>

      <div className="loan-requests">
        {loanRequests.map((request, index) => (
          <Paper
            key={index}
            elevation={3}
            style={{ padding: "20px", margin: "20px 0" }}
          >
            <Typography variant="h6" gutterBottom>
              Loan ID: {request._id}
            </Typography>
            <Typography gutterBottom>Amount: ${request.amount}</Typography>
            <Typography gutterBottom>Term: {request.term} weeks</Typography>
            <Typography gutterBottom>
              Date: {request.createdAt.split("T")[0]}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Status: {request.status}
            </Typography>
          </Paper>
        ))}
      </div>
    </Container>
  );
};

export default UserRequestLoan;
