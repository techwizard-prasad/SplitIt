import React from "react";
import Button from "@material-ui/core/Button";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";

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

      settleClicked: false,

      activeStep: 0
    };

    this.saveUser = this.saveUser.bind(this);
    this.handleSplitClick = this.handleSplitClick.bind(this);
    this.AddExpense = this.AddExpense.bind(this);
    this.resetProduct = this.resetProduct.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
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
        numberOfUsers: user.id,
        settleClicked: false
      };
    });
  }

  AddExpense(product) {
    let newProducts = this.state.products;

    product.totalPrice =
      Number(product.price) + Number(product.price) * Number(product.tax);

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
          (Number(product.price) +
            Number(product.price) * Number(product.tax)) /
          tempProductParticipants.length;
      }
      if (participant.id === Number(product.user)) {
        participant.contribution +=
          Number(product.price) + Number(product.price) * product.tax;
      }
    });

    this.setState({
      products: newProducts,
      settleClicked: false,
      participants: participants
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
    this.setState(prevState => {
      return { activeStep: prevState.activeStep + 1, settleClicked: true };
    });
  }

  handleNext() {
    console.log(this.state.activeStep);
    this.setState(prevState => {
      return { activeStep: prevState.activeStep + 1 };
    });
  }

  handleBack() {
    this.setState(prevState => {
      return { activeStep: prevState.activeStep - 1, settleClicked: false };
    });
  }

  handleReset() {
    // this.setState({
    //   activeStep: 0,
    //   settleClicked: false
    // });
    window.location.reload();
  }

  render() {
    const UserScreen = (
      <div
        style={
          this.state.activeStep === 0
            ? { display: "block" }
            : { display: "none" }
        }
      >
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
      </div>
    );

    const ExpenseScreen = (
      <div
        style={
          this.state.activeStep === 1
            ? { display: "block" }
            : { display: "none" }
        }
      >
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
      </div>
    );

    const steps = ["Add Users", "Add Expenses", "Split"];

    return (
      <div style={{ overflowY: "auto" }}>
        {UserScreen}
        {ExpenseScreen}
        {this.state.settleClicked && (
          <Settlement
            participants={this.state.participants}
            style={
              this.state.activeStep > 1
                ? { display: "block" }
                : { display: "none" }
            }
          />
        )}
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ bottom: 0, position: "fixed" }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Stepper alternativeLabel activeStep={this.state.activeStep}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {this.state.activeStep === steps.length ? (
              <div>
                <Button onClick={this.handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <div>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                  >
                    Back
                  </Button>
                  {this.state.activeStep === 1 ? (
                    <Button
                      onClick={this.handleSplitClick}
                      className="button"
                      color="primary"
                      variant="contained"
                    >
                      Split !t
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                    >
                      {this.state.activeStep === steps.length - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Splitter;
