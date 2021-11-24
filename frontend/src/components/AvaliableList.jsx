import React, {Component} from 'react';
import axios from "axios";
import store from "../store/Store";
import {buttonTextActionToLogout} from "../action/Action";
import {errorPopup} from "./ErrorPopup";
import AvaliableListCard from "./AvaliableListCard";
import {Link} from "react-router-dom";
import moment from "moment";
import { Card, Col, Row } from 'antd';
import PropTypes from "prop-types";
import HouseDetail from "../pages/HouseDetail";
var available_list=[]
var available_list_price=[]
var available_list_search=[]
var available_list_bedroom=[]
var available_list_date=[]
var temp_available_list=[]
class AvaliableList extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state={
      isLoaded:true,
      data_list:[],

    }
    this.getHousingList = this.getHousingList.bind(this);
  }


  UNSAFE_componentWillReceiveProps(nextProps){
    this.setState({
      filter: nextProps.search,
      date:nextProps.date,
      price:nextProps.price,
      bedroom_number:nextProps.bedroom_number,
      low_to_high:nextProps.low_to_high,
      high_to_low:nextProps.high_to_low,

    })


  }
  UNSAFE_componentWillMount() {
    this._isMounted = true;
    this.getHousingList()


  }

  componentWillUnmount() {
    this._isMounted = false;
    available_list=[]
    temp_available_list=[]
  }
  getHousingList=()=>{
    axios.get('http://localhost:5005/listings')
        .then( (response)=>{
          for(let x=0;x<response['data']['listings'].length;x++){
            const list_id=response['data']['listings'][x]['id'].toString()
            axios.get('http://localhost:5005/listings/'+list_id)
                .then((response)=> {
                  if(response['data']['listing']['published']===true&&response['data']['listing']['availability']){
                    if (this._isMounted){
                      available_list.push([response['data']['listing'],list_id])
                      temp_available_list.push([response['data']['listing'],list_id])
                      this.setState({data_list:available_list})
                    }
                  }
                }).catch(function (error) {
              errorPopup(error.response.data.error);
            })
          }

        })
        .catch(function (error) {
          errorPopup(error.response.data.error);
        });
    }

  render() {


    let items = [];
    // if(temp_available_list.length!==available_list.length){
    //   available_list = [].concat(temp_available_list);
    // }
    available_list = [].concat(temp_available_list);

    if(this.state.filter){
      let filter_length=this.state.filter.length
      for(let y=0;y<available_list.length;y++){
        if(filter_length===1){
          if(this.state.filter[0]===available_list[y][0].title||this.state.filter[0]===available_list[y][0].address.city)
            available_list_search.push(available_list[y])
        }
        if(filter_length===2){
          if((this.state.filter[0]===available_list[y][0].title&&this.state.filter[1]===available_list[y][0].address.city)||
              (this.state.filter[1]===available_list[y][0].title&&this.state.filter[0]===available_list[y][0].address.city))
            available_list_search.push(available_list[y])
        }
      }
      available_list_search.sort(function (a, b) {
        return a[0].title.localeCompare(b[0].title); //using String.prototype.localCompare()
      });
      for (let i = 0; i < available_list_search.length; i++) {
        items.push(
          <AvaliableListCard key={i} data={available_list_search[i]}>
          </AvaliableListCard>
        );
      }
      available_list_search=[]
      return(
          <div>
            <Row justify="center" align="middle" gutter={[160, 160]}>
              {items}
            </Row>
          </div>
      );
    }
    if (this.state.date) {
      available_list=temp_available_list
      for (let y = 0; y < available_list.length; y++) {
        for (let j = 0; j < available_list[y][0].availability.length; j++) {
          if ((moment(this.state.date[0], "YYYY-MM-DD").diff(moment(available_list[y][0].availability[j].start,
                  "YYYY-MM-DD"), 'days') >= 0) &&
              (moment(this.state.date[0], "YYYY-MM-DD").diff(moment(available_list[y][0].availability[j].end,
                  "YYYY-MM-DD"), 'days') <= 0) &&
              (moment(this.state.date[1], "YYYY-MM-DD").diff(moment(available_list[y][0].availability[j].start,
                  "YYYY-MM-DD"), 'days') >= 0) &&
              (moment(this.state.date[1], "YYYY-MM-DD").diff(moment(available_list[y][0].availability[j].end,
                  "YYYY-MM-DD"), 'days') <= 0)
          ) {
            available_list_date.push(available_list[y])
          }
        }
      }
      available_list = [].concat(available_list_date);
      available_list_date = []
    }
    if(this.state.price){
      for (let i = 0; i < available_list.length; i++) {
        if (this.state.price[0] && !this.state.price[1]) {
          if (available_list[i][0].price >= this.state.price[0]) {
            available_list_price.push(available_list[i])
          }
        }
        if (this.state.price[1] && !this.state.price[0]) {
          if (available_list[i][0].price <= this.state.price[1]) {
            available_list_price.push(available_list[i])
          }
        }
        if (this.state.price[1] && this.state.price[0]) {
          if (this.state.price[0]<=available_list[i][0].price&& available_list[i][0].price<= this.state.price[1]) {
            available_list_price.push(available_list[i])
          }
        }
      }
      let set_available_list_price=new Set(available_list_price)
      available_list = available_list.filter(item => set_available_list_price.has(item))
      available_list_price = []
    }
    if(this.state.bedroom_number){
      for (let i = 0; i < available_list.length; i++) {

        if (this.state.bedroom_number[0] && !this.state.bedroom_number[1]) {
          if (available_list[i][0].metadata.numBedroom >= this.state.bedroom_number[0]) {
            available_list_bedroom.push(available_list[i])

          }
        }
        if (this.state.bedroom_number[1] && !this.state.bedroom_number[0]) {
          if (available_list[i][0].metadata.numBedroom <= this.state.bedroom_number[1]) {
            available_list_bedroom.push(available_list[i])

          }
        }
        if (this.state.bedroom_number[1] && this.state.bedroom_number[0]) {
          if (this.state.bedroom_number[0] <= available_list[i][0].metadata.numBedroom&&
              available_list[i][0].metadata.numBedroom<= this.state.bedroom_number[1]) {
            available_list_bedroom.push(available_list[i])
          }
        }
      }
      let set_available_list_bedroom=new Set(available_list_bedroom)
      available_list = available_list.filter(item => set_available_list_bedroom.has(item))
      available_list_bedroom = []

    }
    available_list.sort(function (a, b) {
      return a[0].title.localeCompare(b[0].title); //using String.prototype.localCompare()
    });

    if(this.state.low_to_high===true&&(this.state.high_to_low!==true)){
      available_list.sort(function (a, b) {
        return (a[0].price - b[0].price) //using String.prototype.localCompare()
      });
    }
    if(this.state.high_to_low===true&&(this.state.low_to_high!==true)){
      available_list.sort(function (a, b) {
        return (b[0].price-a[0].price) //using String.prototype.localCompare()
      });
    }



    for (let i = 0; i < available_list.length; i++) {
      items.push(
          <AvaliableListCard key={i} data={available_list[i]}>
          </AvaliableListCard>
      );
    }

    return(
        <div>
          <Row justify="center" align="middle" gutter={[16, 16]}>
            {items}
          </Row>
        </div>
    );
  }
}
AvaliableList.propTypes = {

  search:PropTypes.array,
  date:PropTypes.array,
  price:PropTypes.array,
  bedroom_number:PropTypes.array,
  low_to_high:PropTypes.bool,
  high_to_low:PropTypes.bool,



}
export default AvaliableList;