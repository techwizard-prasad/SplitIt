import React from "react";
import "./Styles/App.css";

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
          <option key={i} value={user.id}>
            {user.name}
          </option>
        );
      });

    const userListForCheckBox =
      this.props.numberOfUsers > 0 &&
      this.state.participants.map((user, i) => {
        return (
          <label key={i}>
            <input
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
      <div>
        <input
          type="input"
          placeholder="On What?"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <br />

        <input
          type="number"
          placeholder="Amount"
          name="price"
          value={this.state.price}
          onChange={this.handleChange}
        />
        <br />

        <label>
          Who Paid?
          <select
            id="user"
            name="user"
            value={this.state.user}
            onChange={this.handleChange}
          >
            <option value={0}>Select User</option>
            {userListForDropdown}
          </select>
        </label>
        <br />

        {userListForCheckBox}
        <br />

        <input
          type="button"
          onClick={this.AddExpense}
          value="Add Expense"
          className="button"
        />
      </div>
    );
  }
}

export default AddExpense;
