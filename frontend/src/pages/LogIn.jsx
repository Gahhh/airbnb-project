import React, {Component} from 'react';
import LoginCard from "../components/LoginCard";
import PropTypes from 'prop-types';

import ErrorPopup from "../components/ErrorPopup";
class Login extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { history } = this.props;
    return (
      <LoginCard history={history}>
      </LoginCard>
    );
  }
}
Login.propTypes = {
  history:PropTypes.object,
}

export default Login;