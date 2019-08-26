import React from "react";

function TransactionTable(props) {
  const transactions = props.transactions.map((transaction, i) => {
    return (
      <tr key={i}>
        <td>{transaction.from}</td>
        <td>{transaction.to}</td>
        <td>Rs. {Number(transaction.amount).toFixed(2)}</td>
      </tr>
    );
  });

  return (
    props.transactions.length > 0 && (
      <div>
        <h3>Settlement</h3> <br />
        <p>Settle all your debts in following ways</p>
        <table align="center" border="1">
          <thead>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
          </thead>
          <tbody>{transactions}</tbody>
        </table>
      </div>
    )
  );
}

export default TransactionTable;
