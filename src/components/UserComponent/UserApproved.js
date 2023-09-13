import axios from "axios";
import { Typography, Card, CardContent, Button } from "@mui/material";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserApproved = () => {
  const token = localStorage.getItem("token");
  const [approvedRequests, setApprovedRequests] = useState([]);
  useEffect(() => {
    const approvedData = async () => {
      try {
        const approved = await axios.get(
          `http://localhost:6034/loan/approved`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApprovedRequests(approved.data.approved);
      } catch (err) {
        console.log(err);
      }
    };

    approvedData();
  }, []);

  return (
    <div className="approved-requests">
      <Typography variant="h5">Approved Loans</Typography>
      {approvedRequests.map((request, index) => (
        <Card key={index} variant="outlined" style={{ marginBottom: "16px" }}>
          <CardContent>
            <Typography variant="subtitle1">
              <b>Loan ID:</b> {request._id}
            </Typography>
            <Typography variant="subtitle1">
              <b>Amount:</b> ${request.amount}
            </Typography>
            <Typography variant="subtitle1">
              <b>Term:</b> {request.term} weeks
            </Typography>
            <Typography variant="subtitle1">
              <b>Date:</b> {request.createdAt.split("T")[0]}
            </Typography>
          </CardContent>
          <div className="request-actions">
            <Button
              variant="contained"
              component={Link}
              to={`/user/repayment/${request._id}`}
              style={{
                backgroundColor: "#2ecc71",
                borderRadius: "5px",
                color: "black",
              }}
            >
              Pay
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserApproved;
