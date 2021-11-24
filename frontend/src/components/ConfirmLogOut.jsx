import React from 'react';
import { Modal } from 'antd';
import axios from "axios";
import {errorPopup} from "./ErrorPopup";
import store from "../store/Store";
import {buttonTextActionToLogin} from "../action/Action";

export const confirmLogoutPopup=()=>{
  const logOut=()=>{
    axios.post('http://localhost:5005/user/auth/logout', {}, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(function (response){
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      store.dispatch(buttonTextActionToLogin)


    }).catch(function (error) {
      errorPopup(error.response.data.error);

    });
  }
  return Modal.confirm({
    title: 'Confirm Message',
    content: "Are you sure you want to log out?",
    onOk:logOut,
    className: 'cy-test-logout'
  });

}