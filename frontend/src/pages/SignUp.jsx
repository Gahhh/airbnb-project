import React, {Component} from 'react';
import SignupCard from "../components/SignupCard";
import PropTypes from 'prop-types';
import Login from "./LogIn";
class Signup extends Component {
  render() {
    const { history } = this.props;

    return (
      <SignupCard history={history}>
      </SignupCard>
    );
  }

}
Signup.propTypes = {
  history:PropTypes.object,
}

export default Signup;