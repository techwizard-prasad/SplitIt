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

function UserTable(props) {
  let userListForTable = props.participants.map((user, i) => {
    let priceDifference = user.contribution - user.amountPayable;
    return (
      <TableRow key={i}>
        <TableCell>{user.name}</TableCell>
        <TableCell>Rs. {user.contribution.toFixed(2)}</TableCell>
        <TableCell>Rs. {user.amountPayable.toFixed(2)}</TableCell>
        <TableCell>
          {priceDifference < 0
            ? "To pay Rs " + Math.abs(priceDifference).toFixed(2)
            : priceDifference > 0
            ? "To be paid Rs " + priceDifference.toFixed(2)
            : "Settled"}
        </TableCell>
      </TableRow>
    );
  });

  return (
    props.numberOfUsers > 0 && (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ marginTop: "0" }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <Card style={{ maxHeight: "35vh", overflowY: "auto" }}>
            <Typography variant="h6">Participants</Typography>
            <div style={{ overflowX: "scroll" }}>
              <Table align="center" size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>Participants</TableCell>
                    <TableCell>Total Spent</TableCell>
                    <TableCell>Contribution</TableCell>
                    <TableCell>Settlement</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{userListForTable}</TableBody>
              </Table>
            </div>
          </Card>
        </Grid>
      </Grid>
    )
  );
}

export default UserTable;
