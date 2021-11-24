import React, {Component} from 'react';
import PropTypes from "prop-types";
import AvaliableListCard from "../components/AvaliableListCard";
import {Card,Row,Col,Image,Divider,Tag,Button,Modal,DatePicker,message} from "antd";
import moment from 'moment';
import {
  HomeOutlined,
  StarTwoTone,
  MessageTwoTone
} from '@ant-design/icons';
import styled from "styled-components";
import axios from "axios";
import store from "../store/Store";
import {buttonTextActionToLogout} from "../action/Action";
import {errorPopup} from "../components/ErrorPopup";
var from_date,to_date
const { RangePicker } = DatePicker;
const Styledtitle=styled.h1`
  font-size: 3rem;
`
const StyledColorP=styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: darkblue;
`
const Styledspan=styled.span`
  font-size: 1rem;
`
const StyledBigP=styled.span`
  font-size: 2rem;
`
const StyledP=styled.span`
  font-size: 1rem;
`
const Styledspanbold=styled.span`
  font-size: 1rem;
  font-weight: bold;
`
class HouseDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      isModalVisible:false
    }
  }
  showModal = () => {
    if(localStorage.getItem('token'))
      this.setState({isModalVisible:true})
    else{
      this.haventLogIn()

    }
  }
  haventLogIn = () => {
    message.error({
      content: 'You haven\'t logged in yet.',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
        fontSize:"larger"

      },
    });
  };
  handleReserve = () => {
    const success = (booking_id) => message.success({
      content: 'You have successfully submitted your reservation application.',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
        fontSize:"larger"
      },
    });
    let data={
      "dateRange": {end:to_date,start:from_date},
      "totalPrice":this.props.location.state.detail[0].price*(moment(to_date).diff(from_date,'days'))
    }
    axios.post('http://localhost:5005/bookings/new/'+this.props.location.state.detail[1], data,
      { headers: {  Authorization: localStorage.getItem('token')  } })
      .then(function (response) {
        success(response.data.bookingId)

      })
      .catch(function (error) {
        errorPopup(error.response.data.error);
      });

    this.setState({isModalVisible:false})
  }
  getDate(dates, dateStrings) {
    from_date=dateStrings[0]
    to_date=dateStrings[1]
  }
  disabledDate=(value)=> {
    let interval
    for (let i = 0; i < this.props.location.state.detail[0].availability.length; i++) {
        let start = this.props.location.state.detail[0].availability[i].start.substring(0, 10)
        let end = this.props.location.state.detail[0].availability[i].end.substring(0, 10)
        interval = interval || (value > moment(start, "YYYY-MM-DD") && value < moment(end, "YYYY-MM-DD").add(1, 'days'))
    }
    return (!interval)
  }
  handleCancel = () => {
    this.setState({isModalVisible:false})
  };
  UNSAFE_componentWillMount() {
  }
  render() {
    let bed_num='',bedroom_num,bathroom_num
    if(this.props.location.state.detail[0].metadata.numBeds===1) bed_num='bed'
    else bed_num='beds'
    if(this.props.location.state.detail[0].metadata.numBedroom===1) bedroom_num='bedroom'
    else bedroom_num='bedrooms'
    if(this.props.location.state.detail[0].metadata.numBathroom===1) bathroom_num='bathroom'
    else bathroom_num='bathrooms'
    let amenity=[]
    if(this.props.location.state.detail[0].metadata.amenities){
      for (let x = 0; x < this.props.location.state.detail[0].metadata.amenities.length; x++) {
        amenity.push(
          <Tag color="blue" key={x}><StyledP>{this.props.location.state.detail[0].metadata.amenities[x]}</StyledP></Tag>
        );
      }
    }
    let pic = [];
    for (let i = 0; i < this.props.location.state.detail[0].metadata.propertyPhotos.length; i++) {
      pic.push(
        <Col span={12} key={i}>
          <Image src={this.props.location.state.detail[0].metadata.propertyPhotos[i]} />
        </Col>
      );
    }
    return (
      <div>
        <Row>
          <Col span={12}>
            <Styledtitle>
              {this.props.location.state.detail[0].title}    
              <Button type="primary" shape="round" onClick={this.showModal} id='reserve'> Reserve</Button>
            </Styledtitle>
          </Col>
        </Row>
        <Modal title="Reserve Form" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}
                footer={[
                  <Button key="cancel" onClick={this.handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="reserve" type="primary" onClick={this.handleReserve} id='confirmBooking'>
                    Reserve
                  </Button>
        ]}>
          <Row>
            <Col span={7} >
              <p>Check In & Check Out </p>
            </Col>
            <Col span={16} offset={1}>
              <RangePicker onChange={this.getDate} disabledDate={this.disabledDate} format="YYYY-MM-DD" data-cy='datePicker'/>
            </Col>
          </Row>
        </Modal>

        <Row>
          {amenity}
        </Row>

        <Row>
          <Col span={24}>
            <Styledspan>
              {this.props.location.state.detail[0].metadata.numBeds} {bed_num},
              {this.props.location.state.detail[0].metadata.numBedroom} {bedroom_num},
              {this.props.location.state.detail[0].metadata.numBathroom} {bathroom_num}
            </Styledspan>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Styledspanbold>
              <StyledColorP>${this.props.location.state.detail[0].price}/per night </StyledColorP>
              <HomeOutlined /> {this.props.location.state.detail[0].address.aptNo},
              {this.props.location.state.detail[0].address.street},
              {this.props.location.state.detail[0].address.city},
              {this.props.location.state.detail[0].address.country}
            </Styledspanbold>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Styledspanbold>
              <Styledspanbold/>
              {this.props.location.state.detail[0].metadata.propertyType }
            </Styledspanbold>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={12}>
            <Image src={this.props.location.state.detail[0].thumbnail}/>
          </Col>
          {pic}
        </Row>
      </div>
    );
  }
}
HouseDetail.propTypes = {
  location:PropTypes.object
}

export default HouseDetail;
