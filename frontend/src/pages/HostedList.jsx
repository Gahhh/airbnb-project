import React, {Component} from 'react';
import { DataFetch } from '../utils/api';
import {Button, Row, Col, Card } from "antd";
import {Link} from 'react-router-dom';
import CurrentList from "../components/CurrentHostedList";
import ReactPlayer from "react-player";
import { withRouter } from 'react-router-dom'

class Hostedlist extends Component {
  render() {
    return <CurrentList />
  }
}

export default withRouter(Hostedlist);