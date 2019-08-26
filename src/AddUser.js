import React from "react";
import "./Styles/App.css";

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  saveUser() {
    let user = {
      id: this.props.currentId + 1,
      name: this.state.name
    };
    this.props.saveUser(user);

    this.setState({
      name: ""
    });
  }

  render() {
    return (
      <div>
        <input
          type="input"
          placeholder="Enter Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <br />
        <input
          type="button"
          onClick={this.saveUser}
          value="Save User"
          className="button"
        />
      </div>
    );
  }
}

export default AddUser;
