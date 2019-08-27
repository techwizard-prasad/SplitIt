import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typograpgy from "@material-ui/core/Typography";

class Header extends React.Component {
  render() {
    return (
      <AppBar
        position="static"
        style={{ backgroundColor: "#333333", color: "#e5e5e5" }}
      >
        <Toolbar>
          <Typograpgy variant="h5">Split !t Up</Typograpgy>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
