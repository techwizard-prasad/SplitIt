import React from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      user: 0,
      participants: [],
      tax: 0.0
    };

    this.handleChange = this.handleChange.bind(this);
    this.AddExpense = this.AddExpense.bind(this);
    this.ValidateExpense = this.ValidateExpense.bind(this);
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
    if (this.ValidateExpense()) {
      this.props.AddExpense(this.state);
      this.resetProduct();
    } else {
      return;
    }
  }

  ValidateExpense() {
    if (this.state.name.trim() === "") {
      alert("Please enter the expense title");
      return false;
    }
    if (this.state.price <= 0) {
      alert("Please enter price.");
      return false;
    }
    if (this.state.user <= 0) {
      alert("Please select the user.");
      return false;
    }
    debugger;
    if (
      this.state.participants.every(
        participant => participant.selected === false
      )
    ) {
      alert("Please select atleast one participant.");
      return false;
    }
    return true;
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
      price: "",
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
        style={{ marginTop: "5px" }}
      >
        <Grid item xs={8} sm={8} md={8}>
          <Card>
            <div style={{ maxHeight: "100px", overflowY: "scroll" }}>
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
              <TextField
                select
                id="tax"
                name="tax"
                value={this.state.tax}
                onChange={this.handleChange}
              >
                <MenuItem value={0.0}>0% Tax</MenuItem>
                <MenuItem value={0.05}>5% Tax</MenuItem>
                <MenuItem value={0.12}>12% Tax</MenuItem>
                <MenuItem value={0.125}>12.5% Tax</MenuItem>
                <MenuItem value={0.13}>13% Tax</MenuItem>
                <MenuItem value={0.15}>15% Tax</MenuItem>
                <MenuItem value={0.18}>18% Tax</MenuItem>
                <MenuItem value={0.28}>28% Tax</MenuItem>
              </TextField>
              <br />
              <label>
                <Typography variant="h6">Who Paid?</Typography>
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
              <Typography variant="h6">Select participants</Typography>
              {userListForCheckBox}
              <br />
            </div>
            <Button
              onClick={this.AddExpense}
              color="primary"
              style={{ marginBottom: "5px" }}
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
