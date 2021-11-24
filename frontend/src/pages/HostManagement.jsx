import React from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { Button, List, Row, Col, Statistic } from "antd";
import { dataDispatch } from '../utils/api';
import { errorPopup } from "../components/ErrorPopup";
import moment from 'moment';

const listStyle = {
  minHeight: '350px',
  margin: '5%',
}

const HostManagement = (props) => {
  const listingId = parseInt(props.match.params.id)

  const [bookingDetail, setBookingDetail] = React.useState([]);
  const [isLoaded, setIsloaded] = React.useState(false);
  const [status, setStatus] = React.useState([]);
  const [postOn, setPostOn] = React.useState(0);
  const [bookedDays, setBookedDays] = React.useState(0);
  const [earnToYear, setEarnToYear] = React.useState(0);

  const getListingInfo = () => {
    dataDispatch('GET', `listings/${listingId}`).then(res => {
      const timeDiff = moment(Date.now()).format('X') - moment(res.data.listing.postedOn).format('X');
      setPostOn(moment.duration(timeDiff).days())
    })
  }
  

  const bookDayCheck = (list) => {
    const lastDay = new Date('2021', '12', '0');
    const vaildBook = list.filter(element => {
      return parseInt(element.dateRange['start'].slice(0,4)) <= 2021
    })
    vaildBook.forEach(element => {
      const endYear = parseInt(element.dateRange['end'].slice(0,4));
      if (endYear <= 2021) {
        const endDate = moment(new Date(element.dateRange['end']));
        const startDate = moment(new Date(element.dateRange['start']));
        const dateDiff = moment.duration(endDate - startDate).days();
        setBookedDays(bookedDays+dateDiff)
        setEarnToYear(earnToYear + element.totalPrice)
      } else {
        const startDate = moment(new Date(element.dateRange['start']));
        const endDate = moment(new Date(element.dateRange['end']));
        const dateDiff = moment.duration(lastDay - startDate).days();
        setBookedDays(bookedDays+dateDiff)
        setEarnToYear(earnToYear + dateDiff*(element.totalPrice/(moment.duration(endDate - startDate).days())))
      }
    })

  }

  const getData = () => {
    dataDispatch('GET', 'bookings').then(res => {
      const listingBooking = res.data.bookings.filter(element => {
        return element['listingId'] == listingId
      })
      let newList = [];
      listingBooking.forEach(element => {
        newList.push(element.status);
      })
      const acceptedListing = listingBooking.filter(elem => {
        return elem.status === 'accepted'
      })
      bookDayCheck(acceptedListing);
    
      setStatus(newList);
      setBookingDetail(listingBooking);
      setIsloaded(true)
    }).catch(err => {
      errorPopup(err.response.data.error);
    })
  }
  
  const handleClick = (element, idx, text) => {
    let dateDiff;
    let totalPrice;
    const endDate = moment(new Date(element.dateRange['end']));
    const startDate = moment(new Date(element.dateRange['start']));
    const lastDay = new Date('2021', '12', '0');
    if (startDate > lastDay) {
      dateDiff = 0;
      totalPrice = 0;
    } else {
      if (endDate > lastDay) {
        dateDiff = moment.duration(lastDay - startDate).days();
        totalPrice = dateDiff*(element.totalPrice/(moment.duration(endDate - startDate).days()))
      } else {
        dateDiff = moment.duration(endDate - startDate).days();
        totalPrice = element.totalPrice
      }
    }
    dataDispatch('PUT', `bookings/${text}/${element.id}`)
    .then(res => {
      const changeStatus = [ ...status ];
      switch (text) {
        case 'accept':
          setBookedDays(bookedDays+dateDiff)
          setEarnToYear(earnToYear+totalPrice)
          changeStatus[idx] = 'accepted';
          break;
        case 'decline':
          changeStatus[idx] = 'declined';
          break;
        default:
          break;
      }
      setStatus(changeStatus);
    })
    .catch(err => {
      errorPopup(err.response.data.error);
    })
  }

  const buttonDisplay = (element, idx) => {

    switch (status[idx]) {
      case 'pending':
        return [<Button key='accept' type='primary' onClick={() => {
          handleClick(element, idx, 'accept')}}>Accept</Button>,
        <Button key='deny' type='primary' danger onClick={() => {
          handleClick(element, idx, 'decline')}}>Decline</Button>,]
      
      case 'accepted':
        return [<CheckCircleTwoTone twoToneColor="#52c41a" key='icon' />,
                <h3 key='text'>Accepted</h3>
                ]
      case 'declined':
        return [<CloseCircleTwoTone twoToneColor="#eb2f96" key='icon' />,
                <h3 key='text'>Declined</h3>
                ]
      default:
        break;
    }
  }

  if(!isLoaded) {
    getListingInfo()
    getData()
  }
  if (isLoaded && bookingDetail.length) {
    return (
      <List
        style={listStyle}
      >
        <List.Item>
          <Row justify="center" align="middle" gutter={[16, 16]}>
            <Col>
              <Statistic title="Days Since Post" value={postOn} />
            </Col>
            <Col>
              <Statistic title="Total Booked Days This Year" value={bookedDays} />
            </Col>
            <Col>
              <Statistic title="Total Earn This Year" value={earnToYear} prefix={'$'} precision={2} />
            </Col>
          </Row>
        </List.Item>
        {bookingDetail.map((element, idx) => {
          return (
            <div key={idx}>
              <List.Item
                actions={buttonDisplay(element, idx)}
              >
                <List.Item.Meta
                  title={<div>
                    New booking request</div>}
                  description={<div>Date Range: <br />
                    From: {moment(element.dateRange['start']).format('DD/MM/YYYY')} to {' '}
                    {moment(element.dateRange['end']).format('DD/MM/YYYY')}
                  </div>} />
              </List.Item>
              <List.Item>
              </List.Item>
            </div>
          );
        })}
      </List>
    )
  } else {
    return <div></div>
  }
}

HostManagement.propTypes = {
  match: PropTypes.object,
}

export default withRouter(HostManagement);