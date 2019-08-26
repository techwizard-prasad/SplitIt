import React from "react";

function ExpanseTable(props) {
  let productListForTable = props.expenses.map((product, i) => {
    let user = props.users.find(user => user.id == product.user);
    let participants = product.participants
      .filter(participant => participant.selected)
      .map(part => part.name);
    return (
      <tr key={i}>
        <td>{product.name}</td>
        <td>Rs. {product.price}</td>
        <td>{user.name}</td>
        <td>{participants.join(", ")}</td>
        <td>Rs. {(product.price / participants.length).toFixed(2)}</td>
      </tr>
    );
  });

  return (
    props.expenses.length > 0 && (
      <div>
        <h3>Expenses</h3>
        <table align="center" border="1">
          <thead>
            <tr>
              <th>Expense</th>
              <th>Price</th>
              <th>Paid by?</th>
              <th>Participants</th>
              <th>Each Contribution</th>
            </tr>
          </thead>
          <tbody>{productListForTable}</tbody>
        </table>
      </div>
    )
  );
}

export default ExpanseTable;
