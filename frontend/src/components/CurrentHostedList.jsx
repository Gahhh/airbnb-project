
import React from 'react';
import { dataDispatch } from '../utils/api';
import {
  Row,
  Col,
  Button,
  Card,
  Space,
} from 'antd';
import { Link } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined, ScheduleOutlined } from '@ant-design/icons';
import HostedListingCard from './HostedListingCard';

const CurrentList = () => {

  const ownerCheck = (element) => {
    return element['owner'] === localStorage.getItem('email');
  }

  const allListings = async () => {
    const listings = await dataDispatch('GET', 'listings');
    const userHostList = await listings.data.listings.filter(ownerCheck);
    return userHostList;
  }

  const [listings, setListings] = React.useState([]);
  const [isListChange, setIsListChange] = React.useState(false);
  const listChange = () => {
    setIsListChange(true);
  }

  React.useEffect(() => {
    allListings().then(element => {
      setListings(element)
      setIsListChange(false)
    });
  }, [isListChange]);

  return <Row justify="center" align="middle" gutter={[16, 16]}>
    <Col>
      <Link to="/createnewlisting">
        <Card
          id='createNewList'
          hoverable
          style={{ width: 400, height:355 }}
        >
          <Row>
            <Col span={24} style={{textAlign: 'center'}}>
              <Space direction='vertical'>
                <div style={{textAlign: 'center', fontSize: '90px'}}><PlusOutlined /></div>
                <div style={{textAlign: 'center', fontSize: '40px'}}>Create New Listing</div>
              </Space>
            </Col>
          </Row>
        </Card>
      </Link>
    </Col>
   
    {listings.map((element, idx) => {
      return (
        <Col key={idx}>
          <HostedListingCard listChange={listChange} list={element} />
        </Col>
      )
    })}
  </Row>
}

export default CurrentList;
