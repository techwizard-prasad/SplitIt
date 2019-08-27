import React from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      user: 0,
      participants: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.AddExpense = this.AddExpense.bind(this);
    //this.resetProduct = this.resetProduct.bind(this);
  }

  handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newParticipants = this.state.participants;
      const participantIndex = newParticipants.findIndex(
        participant => participant.id === Number(value)
      );

      newParticipants[participantIndex].selected = checked;

      this.setState({
        participants: newParticipants
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  AddExpense() {
    this.props.AddExpense(this.state);
    this.resetProduct();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const newParticipants = nextProps.participants.map(part => {
      return {
        id: part.id,
        name: part.name,
        selected: false
      };
    });

    this.setState({
      participants: newParticipants
    });
  }

  resetProduct = () => {
    let resetParticipants = this.state.participants.map(participant => {
      return {
        id: participant.id,
        name: participant.name,
        selected: false
      };
    });

    this.setState({
      name: "",
      price: 0,
      user: 0,
      participants: resetParticipants
    });
  };

  render() {
    const userListForDropdown =
      this.props.numberOfUsers > 0 &&
      this.props.participants.map((user, i) => {
        return (
          <MenuItem key={i} value={user.id}>
            {user.name}
          </MenuItem>
        );
      });

    const userListForCheckBox =
      this.props.numberOfUsers > 0 &&
      this.state.participants.map((user, i) => {
        return (
          <label key={i}>
            <Checkbox
              type="checkbox"
              value={user.id}
              onChange={this.handleChange}
              checked={user.selected}
              name={user.name}
            />
            {user.name}
          </label>
        );
      });
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ marginTop: "15px" }}
      >
        <Grid item xs={8} sm={8} md={8}>
          <Card>
            <TextField
              placeholder="On What?"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br />

            <TextField
              type="number"
              placeholder="Amount"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <br />

            <label>
              Who Paid?
              <TextField
                select
                id="user"
                name="user"
                value={this.state.user}
                onChange={this.handleChange}
              >
                <MenuItem value={0}>Select User</MenuItem>
                {userListForDropdown}
              </TextField>
            </label>
            <br />

            {userListForCheckBox}
            <br />

            <Button
              onClick={this.AddExpense}
              color="primary"
              style={{ marginBottom: "10px" }}
            >
              Add Expense
            </Button>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default AddExpense;
