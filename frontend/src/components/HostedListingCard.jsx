import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import styled from "styled-components";
import { Card, Avatar, Row, Col, Modal, Button } from 'antd';
import { EditOutlined, CarryOutOutlined } from '@ant-design/icons';
import { dataDispatch } from '../utils/api';
import ReactPlayer from 'react-player/youtube';
import { withRouter, Router, Link } from 'react-router-dom';
import DeleteListing from './DeleteListing';
import PublishList from './PublishList';

const { Meta } = Card;

const StyledCol = styled(Col)`
  font-weight: bolder;
  color: #061178
`


const HostedListingCard = (props) => {
  const element = props.list;
  const [listing, setListing] = React.useState({});
  const [type, setType] = React.useState('');
  const [reviewArray, setReviewArray] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  const [numBathroom, setNumBathroom] = React.useState(0);
  const [numBeds, setNumBeds] = React.useState(0);
  const [youtube, setYoutube] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);

  const listingData = async () => {
    const data = await dataDispatch('GET', `listings/${element['id']}`);
    const listSet = data.data.listing;
    setListing(listSet);
    setType(listSet['metadata']['propertyType']);
    setReviewArray(listSet['reviews']);
    setNumBathroom(listSet['metadata']['numBathroom']);
    setNumBeds(listSet['metadata']['numBeds']);
    setYoutube(listSet['metadata']['youtubeLink']);
    setPrice(listSet['price']);
    setIsLoaded(true);
  }
  React.useEffect(() => {
    listingData()
  }, [element])

  if (isLoaded) {
    return ( 
      <Card
        hoverable
        style={{ width: 400 }}
        cover={ 
          youtube 
          ? <ReactPlayer url={youtube} width={400} height={200} config={{ youtube: { playerVars: { origin: 'https://www.youtube.com' } } }}/> 
          : <img style={{height: 200}} src={listing['thumbnail']}/>
        }
        actions={[
          <Link to={`/hostmanagement/${element['id']}`} key='book'>
           <CarryOutOutlined /> <div>Bookings</div>
          </Link>,
          <Link to={`/editlisting/${element['id']}`} key='edit' id='edit'>
            <EditOutlined /> <div>Edit</div>
          </Link>,
          <PublishList key='goLive' listing={listing} listingId={element['id']} />,
          <DeleteListing listRefresh={props.listChange} listingId={element['id']} key="delete" />,
        ]}
      >
        <Meta
          title={listing['title']}
          style={{color: '#061178'}}
        />
        <Row>
          <StyledCol span={12}>
              Property: {type}
          </StyledCol>
          <StyledCol span={12}>
            Price: ${price} /Night
          </StyledCol>
        </Row>
        <Row>
          <StyledCol span={12}>
            Bathrooms: {numBathroom}
          </StyledCol>
          <StyledCol span={12}>
            Beds: {numBeds}
          </StyledCol>
        </Row>
        <Row>
          <StyledCol span={24}>Reviews: {reviewArray.length}</StyledCol>
        </Row>
      </Card>
    )
  } else {
    return <div></div>
  }
}

export default withRouter(HostedListingCard);
