import React from "react";
import TransactionTable from "./TransactionTable.js";

class Settlement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: this.props.participants,
      paymentsList: this.props.participants.map((user, i) => {
        let priceDifference = user.contribution - user.amountPayable;
        return {
          id: user.id,
          name: user.name,
          priceDifference: priceDifference.toFixed(2)
        };
      }),
      transactions: []
    };

    this.createTransaction = this.createTransaction.bind(this);

    this.init();
  }

  createTransaction(paymentsList) {
    let listLength = paymentsList.length;
    let transactions = this.state.transactions;
    let transaction;
    if (
      paymentsList[0].priceDifference >
      Math.abs(paymentsList[listLength - 1].priceDifference)
    ) {
      transaction = {
        from: paymentsList[listLength - 1].name,
        to: paymentsList[0].name,
        amount: Math.abs(paymentsList[listLength - 1].priceDifference)
      };
      paymentsList[0].priceDifference -= Math.abs(
        paymentsList[listLength - 1].priceDifference
      );
      paymentsList.pop();
    } else if (
      paymentsList[0].priceDifference <
      Math.abs(paymentsList[listLength - 1].priceDifference)
    ) {
      transaction = {
        from: paymentsList[listLength - 1].name,
        to: paymentsList[0].name,
        amount: paymentsList[0].priceDifference
      };
      paymentsList[listLength - 1].priceDifference +=
        paymentsList[0].priceDifference;
      paymentsList.shift();
    } else {
      transaction = {
        from: paymentsList[listLength - 1].name,
        to: paymentsList[0].name,
        amount: paymentsList[0].priceDifference
      };
      paymentsList.pop();
      paymentsList.shift();
    }

    transactions.push(transaction);

    this.setState({
      transactions: transactions
    });

    return paymentsList;
  }

  init() {
    let paymentsList = this.state.paymentsList;
    while (paymentsList.length > 0) {
      paymentsList.sort(function(a, b) {
        return b.priceDifference - a.priceDifference;
      });

      paymentsList = this.createTransaction(paymentsList);
    }
  }

  render() {
    return <TransactionTable transactions={this.state.transactions} />;
  }
}

export default Settlement;
