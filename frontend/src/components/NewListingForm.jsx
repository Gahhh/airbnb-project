import React, { Component, useState, InputF } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom'
import {
    Form,
    Input,
    InputNumber,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    Upload,
    Space,
    AutoComplete,

} from 'antd';
import { UploadOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import countryList from 'react-select-country-list';
import styled from "styled-components";
import { fileToDataUrl, jsonFileToString } from "../utils/helper";
import { dataDispatch } from '../utils/api';
import { errorPopup } from "./ErrorPopup";
import ListingAmenities from './ListingAmenities';
const { Option } = Select;

const countryData = () => {
  return countryList().getData();
}

const StyledForm = styled(Form)`
 padding: 5vw 0;
`

const StyledInput = styled(Input)`
  max-width: 400px;
`

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 9,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const saveNewListing = (values, props) => {
  let promiseList = [];
  promiseList.push(fileToDataUrl(values['profilePhoto'][0]['originFileObj']));
  values['propertyPhotos'].forEach(element => {
    promiseList.push(fileToDataUrl(element['originFileObj']));
  })

  const address = {
    'aptNo': values['aptNo'],
    'street': values['street'],
    'city': values['city'],
    'state': values['state'],
    'country': values['country'],
    'postcode': values['postcode'],
  }
  
  const meta = {
    'amenities': values['amenities'],
    'numBathroom': values['numBathroom'],
    'numBedroom': values['numBedroom'],
    'numBeds': values['numBeds'],
    'propertyType': values['propertyType'],
    'youtubeLink': values['youtubeLink']
  }

  const body = {
    'title': values['listingTitle'],
    'address': address,
    'price': values['price'],
  }

  Promise.all(promiseList).then(res => {
    body['thumbnail'] = res[0];
    meta['propertyPhotos'] = res.slice(1);
    body['metadata'] = meta;
    dataDispatch('POST', 'listings/new', body)
      .then(props.history.push('/hostedlist'))
      .catch(err => {
        errorPopup(err.response.data.error)
      })
  })

}

const CreateListForm = (props) => {
  const [form] = Form.useForm();
  const onReset = () => {
    setIsDisable(false);
    form.resetFields();
  };

  const [isDisable, setIsDisable] = React.useState(false);
  const [jsonFile, setJsonFile] = React.useState('');
  const [formProps, setFormProps] = React.useState(props);

  const onFinish = (values) => {
    saveNewListing(values, props);
  };


  const upLoadJson = () => {
    jsonFileToString(jsonFile).then(res => {
      dataDispatch('POST', 'listings/new', JSON.parse(res))
      .then(res => {
        formProps.history.push('/hostedlist')
      })
      .catch(err => {
        errorPopup(err.response.data.error)
      })
    }).catch(err => {
      errorPopup(err.response.data.error)
    })
  }

  return (
    <Row>
      <Col span={18} offset={1}>
        <StyledForm
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="listingTitle"
            label="Listing Title"
            rules={[{
                required: true,
                message: 'Please give a name to your listing',
            },
            ]}
          >
            <StyledInput disabled={isDisable}/>
          </Form.Item>

          <Form.Item
            name="street"
            label="Street"
            tooltip="Please enter your street number and name"
            rules={[
              {
                required: true,
                message: 'Please input a vaild street name',
                whitespace: true,
              },
            ]}
          >
            <StyledInput disabled={isDisable} />
          </Form.Item>

          <Form.Item
            name="aptNo"
            label="Apt, suite, etc(Optional)"
            tooltip="Please enter your unit number"
            style={{'wordBreak':'break-all'}}
            rules={[
              {
                required: false,
                
              },
            ]}
          >
            <StyledInput disabled={isDisable} />
          </Form.Item>

          <Form.Item
            name="city"
            label="City/Suburb"
            rules={[
              {
                required: true,
                message: 'Please input a vaild city name',
                whitespace: true,
              },
            ]}
          >
            <StyledInput disabled={isDisable} />
          </Form.Item>

          <Form.Item
            name="state"
            label="State"
            rules={[
              {
                required: true,
                message: 'Please input a vaild state name',
                whitespace: true,
              },
            ]}
          >
            <StyledInput disabled={isDisable} />
          </Form.Item>

          <Form.Item
            name="postcode"
            label="Postcode"
            rules={[
              {
                required: true,
                message: 'Please input a vaild postcode',
                whitespace: true,
              },
            ]}
          >
            <StyledInput disabled={isDisable} />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country/Region"
            rules={[
              {
                required: true,
                message: 'Please select a country',
              },
            ]}
          >
            <Select
              id='countrySelect'
              placeholder="Country/Region"
              allowClear
              style={{maxWidth:'400px'}}
              disabled={isDisable}
            >
              {
                countryData().map(elm => (
                  <Option value={elm.label} key={elm.value} id={elm.label}>{elm.label}</Option> 
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item
            name="propertyType"
            label="Property Type"
            rules={[
              {
                required: true,
                message: 'Please select a property type',
              },
            ]}
          >
            <Select
              id='propertyType'
              placeholder="Choose a general property type"
              allowClear
              style={{maxWidth:'400px'}}
              disabled={isDisable}
            >
              <Option value="Apartment" id='apartment'>Apartment</Option>
              <Option value="House">House</Option>
              <Option value="Studio">Studio</Option>
              <Option value="Unique Space">Unique Space</Option>
              <Option value="Single Bed">Single Bed</Option>
              <Option value="Boutique">Boutique Hotel</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Price (Per Night)"
            rules={[
              {
                required: true,
                message: 'Please enter your property price per night',
              },
            ]}
          >
            <InputNumber 
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                min='0'
                disabled={isDisable}
                style={{width:'30%'}}
            />
          </Form.Item>

          <Form.Item
            name="numBathroom"
            label="Number of Bathroom"
            rules={[
              {
                required: true,
                message: 'Please input number of available bathroom',
              },
            ]}
          >
            <InputNumber
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              min='0'
              disabled={isDisable}
            />
          </Form.Item>

          <Form.Item
            name="numBedroom"
            label="Number of Bedroom"
            rules={[
              {
                required: true,
                message: 'Please input number of available bedroom',
              },
            ]}
          >
            <InputNumber
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              min='0'
              disabled={isDisable}
            />
          </Form.Item>

          <Form.Item
            name="numBeds"
            label="Number of Beds"
            rules={[
              {
                required: true,
                message: 'Please input number of available beds',
              },
            ]}
          >
            <InputNumber
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              min='0'
              disabled={isDisable}
            />
          </Form.Item>

          <Form.Item name="amenities" label="Property Amenities">
            <Checkbox.Group disabled={isDisable}>
              <ListingAmenities />
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            label="Listing Profile Photo"
            name='profilePhoto'
            valuePropName="fileList" 
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: 'Please upload 1 profile photo',
              },
            ]}
          >
            <Upload
              listType="picture-card"
              maxCount='1'
              accept='.jpg, .jpeg, .png'
              disabled={isDisable}
              beforeUpload={() => {
                return false
              }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload <br/> (Max File:1)</div>
              </div>
            </Upload>
          </Form.Item>
          {/* The following RegExp to match youtube link was from GitHub, link:https://gist.github.com/jphase/9086823 */}
          <Form.Item
            name="youtubeLink"
            label="Youtube Link(Optional)"
            rules={[
              {
                pattern: new RegExp(/(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/),
                message: 'Please enter a vaild link, eg: https://www.youtube.com/watch?v=a76-6YhEpLA',
              },

            ]}
          >
            <Input disabled={isDisable} placeholder="Copy your Youtube link here for your profile display" />
          </Form.Item>

          <Form.Item label="Property Photos">
            <Form.Item name="propertyPhotos" 
              noStyle
              valuePropName="fileList" 
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: 'Please upload at least 1 photo',
                },
              ]}
            >
              <Upload.Dragger name="files" 
              maxCount='10'
              multiple
              disabled={isDisable}
              accept='.jpg, .jpeg, .png'
              beforeUpload={() => {
                return false
              }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                <p className="ant-upload-hint">Accept file type: .jpg/.jpeg/.png</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          
          <Form.Item
            label="Full Listing Data"
            name='JsonData'
            valuePropName="jsonList" 
            getValueFromEvent={normFile}
          >
            <Upload.Dragger name="files" 
            maxCount='1'
            accept='.json'
            beforeUpload={(File) => {
              setIsDisable(true)
              setJsonFile(File);
              return false
            }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">You can upload a .json file contain a single listing information</p>
              <p className="ant-upload-hint">Support for a single file only</p>
              <p className="ant-upload-hint">Accept file type: .json</p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Space size={[100, 100]}>
              {isDisable 
                ? <Button type='primary' onClick={upLoadJson}>Submit File</Button>
                : <Button type="primary" htmlType="submit" id='create'>Create</Button>
              }
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </StyledForm>
      </Col>
    </Row>
    
  );
};

export default withRouter(CreateListForm);