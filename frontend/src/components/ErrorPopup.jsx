import React from 'react';
import { Modal, Button } from 'antd';

export const errorPopup=(errorMessage)=>{
  return Modal.error({
    title: 'Error Message',
    content: errorMessage,
  });

}



