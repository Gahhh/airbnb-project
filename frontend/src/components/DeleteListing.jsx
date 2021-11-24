import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined,DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { dataDispatch } from '../utils/api';
import { errorPopup } from "./ErrorPopup";
import { Modal, Space } from 'antd';
import { withRouter } from 'react-router-dom';

const DeleteListing = (props) => {
  const listingId = props.listingId;
  const changes = props.changes;
  const listRefresh = props.listRefresh;
  
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleDelete = () => {
    dataDispatch('DELETE', `listings/${listingId}`).then(res => {
      setIsModalVisible(false)
      listRefresh()
    })
    .catch(err => {
      errorPopup(err.response.data.error)
    })
  }

  const handleOk = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return <>
    <Space direction='vertical' onClick={handleOk} size={1} id='delete'>
      <DeleteOutlined />
      Delete
    </Space>
    
    <Modal title='Are you sure?' 
      visible={isModalVisible} 
      onOk={handleDelete} 
      onCancel={handleCancel} 
    >
      This listing will delete from your list.
    </Modal>
  </>
}
DeleteListing.propTypes = {
    listingId: PropTypes.number,
    changes: PropTypes.func,
    listRefresh: PropTypes.func,
  }
export default withRouter(DeleteListing);