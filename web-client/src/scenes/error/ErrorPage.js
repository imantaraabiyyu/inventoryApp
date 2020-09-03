import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "../styles.js";

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h1>
          <strong>
            <center>
              {this.props.code}
              <p>Oops! Page Not Found</p>
            </center>
          </strong>
        </h1>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  code: PropTypes.number
};

export default withStyles(styles, { withTheme: true })(ErrorPage);
