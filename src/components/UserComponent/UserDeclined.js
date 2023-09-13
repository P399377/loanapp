import axios from "axios";
import { Typography, Paper, Container } from "@mui/material";

import React, { useEffect, useState } from "react";

const UserDeclined = () => {
  const token = localStorage.getItem("token");
  const [declinedRequests, setDeclinedRequest] = useState([]);
  useEffect(() => {
    const declinedData = async () => {
      try {
        const declined = await axios.get(
          `http://localhost:6034/loan/declined`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDeclinedRequest(declined.data.declined);
      } catch (err) {
        console.log(err);
      }
    };

    declinedData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <div className="loan-requests">
        {declinedRequests.map((request, index) => (
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

export default UserDeclined;
