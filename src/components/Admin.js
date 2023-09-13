import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import AdminRequest from "./AdminComponent/AdminRequest";

import axios from "axios";
import toast from "react-hot-toast";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Paper,
} from "@mui/material";
//showLoader, hideLoader
const Admin = () => {
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  console.log(token);
  // useEffect(() => {
  //   if (`${!token}`) {
  //     navigate("/");
  //   }
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    const request = async () => {
      // showLoader();
      try {
        const data = await axios.get("http://localhost:6034/loan/allpending", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequestData(data.data.pending);
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message);
        }
        console.error(err);
      }
      // hideLoader();
      setLoading(false);
    };
    request();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {requestData && requestData.length > 0 ? (
            requestData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={3}>
                  <AdminRequest
                    // showLoader={showLoader}
                    // hideLoader={hideLoader}
                    name={item.name}
                    amount={item.amount}
                    loanId={item._id}
                    term={item.term}
                    setRequestData={setRequestData}
                  />
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                No loan requests have been made yet.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Admin;
