import React from "react";
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  Card
} from "@material-ui/core";

function TransactionTable(props) {
  const transactions = props.transactions.map((transaction, i) => {
    return (
      <TableRow key={i}>
        <TableCell>{transaction.from}</TableCell>
        <TableCell>{transaction.to}</TableCell>
        <TableCell>Rs. {Number(transaction.amount).toFixed(2)}</TableCell>
      </TableRow>
    );
  });

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ marginTop: "15px" }}
    >
      <Grid item xs={12} sm={12} md={12}>
        <Card style={{ maxHeight: "300px", overflowY: "scroll" }}>
          {props.transactions.length > 0 ? (
            <div>
              <Typography variant="h6">Settlement</Typography>
              <Typography variant="subtitle2">
                Settle all your debts in following ways
              </Typography>
              <div style={{ overflowX: "scroll" }}>
                <Table align="center" size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{transactions}</TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <Typography variant="h6">There are no debts. Cheers!</Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}

export default TransactionTable;
