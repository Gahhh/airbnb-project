import React, {Component} from 'react';
import { DataFetch } from '../utils/api';
import { ControlOutlined,SearchOutlined } from '@ant-design/icons';
import {Button, Row, Col, Divider, Space} from "antd";
import {Link} from 'react-router-dom';
import CurrentList from "../components/CurrentHostedList";
import ReactPlayer from "react-player";
import AvaliableList from "../components/AvaliableList";
import { Input,DatePicker,Card,Drawer,Form,Select,InputNumber,Checkbox} from 'antd';
import styled from "styled-components";
import moment from "moment";
import {errorPopup} from "../components/ErrorPopup";
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
var date_list=[]
var min_price
var max_price
var min_bedroom_number
var max_bedroom_number
var high_to_low
var low_to_high

const StyledP=styled.span`
  font-size: 1rem;
  font-weight: bold;
`
const StyledDiv=styled.div`
  margin-bottom: 20px;
`
const StyledDiv2=styled.div`
  margin: 20px;
`
class Housinglist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reset:false
    }
  }
  state = { visible: false };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  getDate=(dates, dateStrings)=> {
    date_list=[dateStrings[0],dateStrings[1]]

  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onSearch = (value) => {
    let value_list=value.split(" ")
    if(value){
      this.setState({
        title_and_city: value_list
      })
    }
  }

  getMinPrice(value) {
    min_price=value
  }
  getMaxPrice(value) {
    max_price=value
  }
  getMinBedroom(value) {
    min_bedroom_number=value
  }
  getMaxBedroom(value) {
    max_bedroom_number=value
  }

  HightoLow=(value)=> {
    high_to_low=value.target.checked


  }
  LowtoHigh=(value)=> {
    low_to_high=value.target.checked

  }
  disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  onChange(value) {

  }
  onAfterChange(value) {

  }
  SubmitFormFilter=()=>{
    if(date_list.length!==0){
      this.setState({
        date:date_list,
      });
    }
    if(min_price&&max_price&&min_price<=max_price){
      this.setState({
        price:[min_price,max_price]
      });
    }
    if(min_price&&max_price&&min_price>max_price){
      errorPopup("Max price value should be bigger than min price")
    }
    if(min_price&&!max_price){
      this.setState({
        price:[min_price,null]
      });
    }
    if(!min_price&&max_price){
      this.setState({
        price:[null,max_price]
      });
    }
    if(min_bedroom_number&&max_bedroom_number&&min_bedroom_number<=max_bedroom_number){
      this.setState({
        bedroom_number:[min_bedroom_number,max_bedroom_number]
      });
    }
    if(min_bedroom_number&&max_bedroom_number&&min_bedroom_number>max_bedroom_number){
      errorPopup("Max bedroom number should be bigger than min bedroom number")
    }
    if(min_bedroom_number&&!max_bedroom_number){
      this.setState({
        bedroom_number:[min_bedroom_number,null]
      });
    }
    if(!min_bedroom_number&&max_bedroom_number){
      this.setState({
        bedroom_number:[null,max_bedroom_number]
      });
    }
    if(high_to_low&&low_to_high){
      errorPopup("Please check only one price sorting.")
    }

    this.setState({
      high_to_low: high_to_low
    })
    this.setState({
      low_to_high: low_to_high
    })
    this.setState({
      visible: false,
    });
  }



  render() {


    return (<div>
      <StyledDiv2>
        <Button type="primary" onClick={this.showDrawer} size={"large"}>
          <ControlOutlined />Filters
        </Button>
      </StyledDiv2>
      <StyledDiv2>
        <Search placeholder="input search text" onSearch={this.onSearch} enterButton style={{width:250}}/>
      </StyledDiv2>

      <Drawer
          title="Filters"
          width={400}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          placement={"left"}
      >
        <Form layout="vertical" hideRequiredMark>

          <Row gutter={16}>
            <Col span={20}>
              <StyledDiv>
                <RangePicker onChange={this.getDate} disabledDate={this.disabledDate}/>
              </StyledDiv>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={5}>
              <StyledDiv>
                min price
              </StyledDiv>
            </Col>
            <Col span={16}>
              <StyledDiv>
                <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.getMinPrice}
                />
              </StyledDiv>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={5}>
              <StyledDiv>
                max price
              </StyledDiv>
            </Col>
            <Col span={16}>
              <StyledDiv>
                <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.getMaxPrice}
                />
              </StyledDiv>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={11}>
              <StyledDiv>
                min bedroom number
              </StyledDiv>
            </Col>
            <Col span={12}>
              <StyledDiv>
                <InputNumber
                    formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.getMinBedroom}
                />
              </StyledDiv>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={11}>
              <StyledDiv>
                max bedroom number
              </StyledDiv>
            </Col>
            <Col span={12}>
              <StyledDiv>
                <InputNumber
                    formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.getMaxBedroom}
                />
              </StyledDiv>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <StyledDiv>
                from highest to lowest review rating
              </StyledDiv>
            </Col>
            <Col span={8}>
              <StyledDiv>
                <Checkbox onChange={this.HightoLow}> </Checkbox>
              </StyledDiv>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <StyledDiv>
                from lowest to highest review rating
              </StyledDiv>
            </Col>
            <Col span={8}>
              <StyledDiv>
                <Checkbox onChange={this.LowtoHigh}> </Checkbox>
              </StyledDiv>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4} offset={8}>
              <Button type={"primary"} onClick={this.SubmitFormFilter}>
                show stays
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <AvaliableList search={this.state.title_and_city} date={this.state.date} price={this.state.price}
                     bedroom_number={this.state.bedroom_number} low_to_high={this.state.low_to_high}
                     high_to_low={this.state.high_to_low}
      />
    </div>)
  }
}
export default Housinglist;