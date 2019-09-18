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

function ExpanseTable(props) {
  let productListForTable = props.expenses.map((product, i) => {
    let user = props.users.find(user => user.id == product.user);
    let participants = product.participants
      .filter(participant => participant.selected)
      .map(part => part.name);
    return (
      <TableRow key={i}>
        <TableCell>{product.name}</TableCell>
        <TableCell>Rs. {product.price}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{participants.join(", ")}</TableCell>
        <TableCell>
          Rs. {(product.price / participants.length).toFixed(2)}
        </TableCell>
      </TableRow>
    );
  });

  return (
    props.expenses.length > 0 && (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ marginTop: "5px" }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <Card style={{ maxHeight: "27vh", overflowY: "auto" }}>
            <Typography variant="h6">Expenses</Typography>
            <div style={{ overflowX: "auto" }}>
              <Table align="center" size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>Expense</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Paid by?</TableCell>
                    <TableCell>Participants</TableCell>
                    <TableCell>Each Contribution</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{productListForTable}</TableBody>
              </Table>
            </div>
          </Card>
        </Grid>
      </Grid>
    )
  );
}

export default ExpanseTable;
