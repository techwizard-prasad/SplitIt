import React from "react";
import "./Styles/App.css";

function UserTable(props) {
  let userListForTable = props.participants.map((user, i) => {
    let priceDifference = user.contribution - user.amountPayable;
    return (
      <tr key={i}>
        <td>{user.name}</td>
        <td>Rs. {user.contribution.toFixed(2)}</td>
        <td>Rs. {user.amountPayable.toFixed(2)}</td>
        <td>
          {priceDifference < 0
            ? "To pay Rs " + Math.abs(priceDifference).toFixed(2)
            : priceDifference > 0
            ? "To be paid Rs " + priceDifference.toFixed(2)
            : "Settled"}
        </td>
      </tr>
    );
  });

  return (
    props.numberOfUsers > 0 && (
      <div>
        <h3>Participants</h3>
        <table align="center">
          <thead>
            <tr>
              <th>Participants</th>
              <th>Total Spent</th>
              <th>Contribution</th>
              <th>Settlement</th>
            </tr>
          </thead>
          <tbody>{userListForTable}</tbody>
        </table>
      </div>
    )
  );
}

export default UserTable;
