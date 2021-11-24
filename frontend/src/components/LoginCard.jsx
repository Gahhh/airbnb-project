import React, {Component} from 'react';
import { Row, Col } from 'antd';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import './ErrorPopup'
import {errorPopup} from "./ErrorPopup";
import store from "../store/Store";
import {buttonTextAction, buttonTextActionToLogin, buttonTextActionToLogout} from "../action/Action";
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import Login from "../pages/LogIn";

var parent_prop=null
class LoginCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      loginFlag:false
    }
      this.getInputValue=this.getInputValue.bind(this);
  }
  componentDidMount () {

      parent_prop=this.props
  }
  emailChange(e){
    this.setState({
      email:e.target.value
    })
  }
  passwordChange(e){
    this.setState({
      password:e.target.value
    })
  }


  getInputValue=(e)=>{
    if(this.state.password!==''&&this.state.email!==''){
      let data = {"email":this.state.email,"password":this.state.password};
      axios.post('http://localhost:5005/user/auth/login', data)
        .then(function (response) {

          localStorage.setItem("token",response['data']['token']);
          localStorage.setItem("email",data['email']);


          store.dispatch(buttonTextActionToLogout);


            parent_prop.history.push('/housinglist')

        })
        .catch(function (error) {

          errorPopup(error.response.data.error);

          });
    }
  }

  render() {
    return (
      <Row>
        <Col span={24} id='top_space' style={{height:20}}>
        </Col>
        <Col span={6}>
        </Col>
        <Col span={10} >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input onChange={(e)=>this.emailChange(e)}/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password onChange={(e)=>this.passwordChange(e)}/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset:12, span: 8 }}>
              <Button type="primary" htmlType="submit" onClick={this.getInputValue} id='submit'>
                Submit
              </Button>

            </Form.Item>
          </Form>
        </Col>
        <Col span={8}>
        </Col>
      </Row>
    );
  }
}
LoginCard.propTypes = {
    history_login:PropTypes.object,

}

export default LoginCard;