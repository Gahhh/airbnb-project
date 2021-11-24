import React, {Component} from 'react';
import {Button, Row, Col, Space } from "antd";
import { Layout } from 'antd';
const { Header } = Layout;
import { confirmLogoutPopup } from "./ConfirmLogOut";
import {Link} from 'react-router-dom';
// import {button_text_action} from "../action/Action";
import {createStore} from "redux";
import store from "../store/Store";
// import button_text_reducer from "../reducer/Reducer";


class HomeHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      button1Text:'Log In',
      button2Text:"Sign Up",
      button3Text:"Housing List",
      button1:'in',//the left button
      button2:'signup',//the middle button
    }
    store.subscribe(() => {
      if(this.state.button1==='in'){
        this.setState({button1:'out'})
      }else{
        if(this.state.button1==='out'){
          this.setState({button1:'in'})
        }
      }

      if(this.state.button2==='signup'){
        this.setState({button2:'host_list'})
      }else{
        if(this.state.button2==='host_list'){
          this.setState({button2:'signup'})
        }
      }
    }
    )
  }

  render() {
    let button1 =null;
    let button2=null;
    if(this.state.button1==="in"){
      button1=<Button ghost name='login'>
        <Link to="/login/" >
          Log In
        </Link>
      </Button>
    }
    if(this.state.button1==="out"){
      button1=
      <Link to='/'>
        <Button ghost onClick={confirmLogoutPopup} name='logout' >
          Log Out
        </Button>
      </Link>

    }
    if(this.state.button2==="signup"){
      button2=<Button ghost name='signup'>
        <Link to="/signup/" >
          Sign Up
        </Link>
      </Button>
    }
    if(this.state.button2==="host_list"){
      button2=<Button ghost name='hostedlist'>
        <Link to="/hostedlist/" >
          Hosted List
        </Link>
      </Button>
    }

    return (
      <Header>
        <Row type="flex" justify="end">

          <Col>
            {button1}
          </Col>

          <Col>
            {button2}
          </Col>

          <Col>
            <Button ghost name='housinglist'>
              <Link to="/housinglist/" >
                {this.state.button3Text}
              </Link>
            </Button>
          </Col>
        </Row>
      </Header>
    )
  }
}
export default HomeHeader;