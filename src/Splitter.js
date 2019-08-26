import React from "react";

import AddUser from "./AddUser.js";
import UserTable from "./UserTable.js";
import AddExpense from "./AddExpense.js";
import ExpenseTable from "./ExpanseTable.js";
import Settlement from "./Settlement.js";

class Splitter extends React.Component {
  constructor() {
    super();
    this.state = {
      numberOfUsers: 0,
      participants: [
        {
          id: 0,
          name: "",
          contribution: 0,
          amountPayable: 0
        }
      ],

      products: [],

      settleClicked: false
    };

    this.saveUser = this.saveUser.bind(this);
    this.handleSplitClick = this.handleSplitClick.bind(this);
    this.AddExpense = this.AddExpense.bind(this);
    this.resetProduct = this.resetProduct.bind(this);
  }

  saveUser(user) {
    let tempUser = {
      id: user.id,
      name: user.name,
      contribution: 0,
      amountPayable: 0
    };

    let newParticipans = user.id > 1 ? this.state.participants : [];
    newParticipans.push(tempUser);

    this.setState(prevState => {
      return {
        participants: newParticipans,
        numberOfUsers: user.id
      };
    });
  }

  AddExpense(product) {
    let newProducts = this.state.products;
    newProducts.push(product);

    let participants = this.state.participants;

    let tempProductParticipants = product.participants.filter(
      prodParticipant => prodParticipant.selected === true
    );

    participants.forEach(participant => {
      if (
        product.participants.some(
          prodParticipant =>
            prodParticipant.id === participant.id && prodParticipant.selected
        )
      ) {
        participant.amountPayable +=
          product.price / tempProductParticipants.length;
      }
      if (participant.id === Number(product.user)) {
        participant.contribution += Number(product.price);
      }
    });

    this.setState({
      products: newProducts
    });
  }

  resetProduct() {
    this.setState(prevState => {
      const oldParticipants = prevState.product.participants;
      oldParticipants.forEach(element => {
        element.selected = false;
      });
      return {
        product: { name: "", price: 0, user: 0, participants: oldParticipants }
      };
    });
  }

  handleSplitClick() {
    this.setState({
      settleClicked: true
    });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <AddUser
          saveUser={this.saveUser}
          currentId={this.state.numberOfUsers}
        />
        <br />
        <UserTable
          participants={this.state.participants}
          numberOfUsers={this.state.numberOfUsers}
        />
        <br />
        <AddExpense
          participants={this.state.participants}
          numberOfUsers={this.state.numberOfUsers}
          AddExpense={this.AddExpense}
        />
        <br />
        <ExpenseTable
          expenses={this.state.products}
          users={this.state.participants.map(participant => {
            return { id: participant.id, name: participant.name };
          })}
        />
        <button onClick={this.handleSplitClick} className="button">
          Split !t{" "}
        </button>
        {this.state.settleClicked && (
          <Settlement participants={this.state.participants} />
        )}
      </div>
    );
  }
}

export default Splitter;
