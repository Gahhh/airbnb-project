import React, {Component} from 'react';
import { Row, Col } from 'antd';
import { Form, Input, Button } from 'antd';
import axios from "axios";
import {errorPopup} from "./ErrorPopup";
import store from "../store/Store";
import {buttonTextActionToHostedList, buttonTextActionToLogout} from "../action/Action";
import PropTypes from 'prop-types';
import LoginCard from "./LoginCard";
var parent_prop;
class SignupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      name:"",
      confrimPassword:""
    }
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
  confrimPasswordChange(e){
    this.setState({
      confrimPassword:e.target.value
    })
  }
  nameChange(e){
    this.setState({
      name:e.target.value
    })
  }
  getInputValue=(e)=>{
    if(this.state.password!==''&&this.state.email!==''&&this.state.name!==''&&this.state.confrimPassword!==''
    &&this.state.password!==this.state.confrimPassword) {
      errorPopup("The entered passwords are inconsistent.");
    }
    if(this.state.password!==''&&this.state.email!==''&&this.state.name!==''&&this.state.confrimPassword!==''
      &&this.state.password===this.state.confrimPassword){
        let data = {"email":this.state.email,"password":this.state.password,name:this.state.name};
        axios.post('http://localhost:5005/user/auth/register', data)
          .then(function (response) {
            localStorage.setItem("token",response['data']['token']);
            localStorage.setItem("email",data['email']);
            store.dispatch(buttonTextActionToHostedList);
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
            labelCol={{ span: 10 }}
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
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input onChange={(e)=>this.nameChange(e)}/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password onChange={(e)=>this.passwordChange(e)}/>
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="ConfirmPassword"
              rules={[{ required: true, message: 'Please comform your password!' }]}
            >
              <Input.Password onChange={(e)=>this.confrimPasswordChange(e)}/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset:10, span: 8 }}>
              <Button type="primary" htmlType="submit" onClick={this.getInputValue} name='submit'>
                Register
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
SignupCard.propTypes = {
  history_signup:PropTypes.object,

}
export default SignupCard;