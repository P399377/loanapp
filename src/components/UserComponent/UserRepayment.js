import { Button } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const handlePayClick = async (loanId, repaymentTerm, setLoanTerms) => {
  const token = localStorage.getItem("token");
  try {
    await axios.put(
      "http://localhost:6034/loan/repayment",
      {
        loanId,
        repaymentTerm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Repayment done");
    const term = await axios.get(
      `http://localhost:6034/loan/repayment/${loanId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoanTerms(term.data.repayments);
  } catch (err) {
    if (err.response) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Internal Server error");
    }
  }
};

const UserRepayment = () => {
  const { loanId } = useParams();
  const [loanTerms, setLoanTerms] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const termData = async () => {
      try {
        const term = await axios.get(
          `http://localhost:6034/loan/repayment/${loanId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoanTerms(term.data.repayments);
      } catch (err) {
        console.log(err);
      }
    };
    termData();

    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loanTerms.map((term, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">
                  {term.dueDate.split("T")[0]}
                </TableCell>
                <TableCell align="right">${term.repaymentAmount}</TableCell>
                <TableCell align="right">{term.status}</TableCell>
                <TableCell align="right">
                  {term.status === "PAY" && (
                    <Button
                      onClick={async () => {
                        await handlePayClick(loanId, index + 1, setLoanTerms);
                      }}
                    >
                      Pay
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserRepayment;
