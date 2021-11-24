/* eslint-disable react/prop-types */
import React from 'react';
import { DatePicker, Space } from 'antd';
import { Modal, Button } from 'antd';
import { CheckCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { dataDispatch } from '../utils/api';
import { errorPopup } from './ErrorPopup';

const { RangePicker } = DatePicker;

const PublishList = (props) => {
  const publishState = props.listing.published;

  let initDateRange = [];
  if (props.listing.availability.length && publishState) {
    const availability = props.listing.availability
    availability.map((element, idx) => {
      initDateRange.push([moment(moment(element['start']).format('DD/MM/YYYY'), 'DD/MM/YYYY'), moment(moment(element['end']).format('DD/MM/YYYY'), 'DD/MM/YYYY')]);
    })
  } else {
    initDateRange = [''];
  }

  const [dateRange, setDateRange] = React.useState(initDateRange);
  const [isPublish, setIsPublish] = React.useState(publishState);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showDate = (date, idx) => {
    const newDateRange = [ ...dateRange ];
    newDateRange[idx] = date;
    setDateRange(newDateRange);
    if (date) {
      setIsEdit(true);
    }
  }

  const addMoreDateField = () => {
    const newDateRange = [ ...dateRange ];
    newDateRange.push(['']);
    setDateRange(newDateRange);
  }

  const removeDateField = () => {
    const newDateRange = [ ...dateRange ];
    newDateRange.pop();
    setDateRange(newDateRange);
  }

  const goPublish = () => {
    let availability = [];
    dateRange.map(element => {
      if (element) {
        availability.push({'start': element[0], 'end': element[1]})
      }
    })
    const body = {
      "availability": availability
    }
    if (isPublish) {
        dataDispatch('PUT', `listings/unpublish/${props.listingId}`).then(
          dataDispatch('PUT', `listings/publish/${props.listingId}`, body).then(res => {
            setIsPublish(true);
            setDateRange(availability)
            handleOk();
          }
          ).catch(err => {
            errorPopup(err.response.data.error)
          })
        )
    } else {
      dataDispatch('PUT', `listings/publish/${props.listingId}`, body).then(res => {
        setIsPublish(true);
        setDateRange(availability)
        handleOk();
      }
      ).catch(err => {
        errorPopup(err.response.data.error)
      })
    }  
  }

  const clearDateRange = () => {
    const newDateRange = [ ...dateRange ];
    while (newDateRange.length) {
      newDateRange.pop();
    }
    setDateRange([]);
  }

  const goOffLine = () => {
    dataDispatch('PUT', `listings/unpublish/${props.listingId}`).then(res => {
      setIsPublish(false);
      setIsEdit(false);
      clearDateRange();
      handleOk();
    }).catch(err => {
      errorPopup(err.response.data.error)
    })
  }
  const isLiving = () => {
    return !isPublish
  }

  const isDateSelect = () => {
    return (dateRange[0]  && isEdit) ? false : true
  }

  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  const dateFormat = 'DD/MM/YYYY'
  return (
    <>
      <div>
        {isPublish
          ? <Space direction='vertical' onClick={showModal} size={1} id='publish'>
              <CheckCircleTwoTone twoToneColor="#52c41a" /> 
              Publishing
            </Space>
          : <Space direction='vertical' onClick={showModal} size={1} id='goPublish'>
              <PauseCircleTwoTone twoToneColor="#9c9c9c"/>
              Go Live
            </Space>}
      </div>
      <Modal title="Availability Date" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[<>
          <Button key='cancel' onClick={handleCancel}>Cancel</Button>
          <Button key='offline' danger onClick={goOffLine} disabled={isLiving()} data-cy='offline'>Go Offline</Button>
          <Button key='online' type='primary' onClick={goPublish} disabled={isDateSelect()} data-cy='online'>Go Live</Button>
        </>
        ]}
      >
        <Space direction="vertical">
          Please select availability date range for your property:
          {dateRange.map((date, idx) => {
            return <RangePicker data-cy="datePicker"
              disabledDate={disabledDate} 
              defaultValue={dateRange[idx]}
              onChange={(e) => {showDate(e, idx)}} 
              format={dateFormat} 
              key={idx}
            />
          })}
          {dateRange.length < 10 && 
            <Button key='addMore' onClick={addMoreDateField} data-testid="Add">Add Date Range</Button>
          }
          {dateRange.length > 1 &&
            <Button key='delete' onClick={removeDateField} data-testid="Remove">Remove Last Date Range</Button>
          }
        </Space>
      </Modal>
    </>
  )
}

export default PublishList;