import React, {Component} from 'react';
import { Card, Col, Row } from 'antd';
import styled from "styled-components";
import PropTypes from "prop-types";
import { CommentOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player';
import HouseDetail from "../pages/HouseDetail";
import {useLocation,Link} from "react-router-dom";
import LoginCard from "./LoginCard";
const StyledCard=styled(Card)`
  margin-left: 5px;
  font-weight: bolder;
  color: #061178;
  font-size: medium;
  
`

class AvaliableListCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let detail_url="/house/"+this.props.data[0].title
    const { Meta } = Card;
    return (
      <Link to={
        {
          pathname:detail_url,
          state:{detail:this.props.data}
        }
      }>
        <StyledCard
          data-cy = {this.props.data[0].title}
          style={{width:400}}
          hoverable
          cover={this.props.data[0].metadata.youtubeLink
            ? <ReactPlayer url={this.props.data[0].metadata.youtubeLink} width={400} height={200} config={{ youtube: { playerVars: { origin: 'https://www.youtube.com' } } }}/> 
            : <img alt="Property Picture"
              src= {this.props.data[0].thumbnail} style={{height:200}}/>
          }
        >
          <Meta title={this.props.data[0].title} />
          <Row>
            <Col span={16}>
              <span >
                {"$"+this.props.data[0].price.toString()+"/night"}
              </span>
            </Col>
            <Col span={8}>
              <span>
                <CommentOutlined style={{fontSize:'larger'}}/>
                <span style={{margin:'7px'}}>
                  {this.props.data[0].reviews.length}
                </span>
              </span>
            </Col>
          </Row>
        </StyledCard>
      </Link>
    );
  }
}
AvaliableListCard.propTypes = {
  data:PropTypes.array
}
export default AvaliableListCard;