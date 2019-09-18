import React from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
//import { makeStyles } from "@material-ui/core";

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
    if (this.state.name.trim() === "") {
      alert("Please enter name of participant.");
      return;
    }
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
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ marginTop: "5px" }}
      >
        <Grid item xs={8} sm={8} md={8}>
          <Card>
            <TextField
              type="input"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={this.handleChange}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            />
            <br />
            <Button
              onClick={this.saveUser}
              style={{ marginBottom: "5px" }}
              color="primary"
            >
              Save User
            </Button>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default AddUser;
