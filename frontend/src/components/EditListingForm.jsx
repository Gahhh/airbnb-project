import React from 'react';
import { withRouter } from 'react-router-dom'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { Space, Upload, Row, Col, Button, Form, Input, InputNumber, Checkbox, Select } from 'antd';
import styled from "styled-components";
import PropTypes from 'prop-types';
import countryList from 'react-select-country-list';
import { fileToDataUrl } from "../utils/helper";
import { dataDispatch } from '../utils/api';
import { errorPopup } from "./ErrorPopup";
const { Option } = Select;

const StyledInput = styled(Input)`
  max-width: 400px;
`
const StyledForm = styled(Form)`
 padding: 5vw 0;
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
const countryData = () => {
  return countryList().getData();
}


const EditListingForm = (props) => {
  const element = props.element;
  const metaData = element.metadata;

  const [isEdit, setIsEdit] = React.useState(false)

  const isTrigger = React.useRef(false);

  React.useEffect(() => {
    if (!isTrigger.current) {
      isTrigger.current = true;
    } else {
      setIsEdit(true);
    }
  }, [isEdit])

  const preFillValue = {
    listingTitle: element.title,
    street: element.address.street,
    aptNo: element.address.aptNo,
    city: element.address.city,
    state: element.address.state,
    postcode: element.address.postcode,
    country: element.address.country,
    propertyType: metaData.propertyType,
    price: element.price,
    numBathroom: metaData.numBathroom,
    numBedroom: metaData.numBedroom,
    numBeds: metaData.numBeds,
    amenities: metaData.amenities,
    youtubeLink: metaData.youtubeLink,
  }

  const isSaveButton = () => {
    return isEdit ? false : true;
  }

  const formEdited = () => {
    setIsEdit(true)
  }

  const handleCancel = () => {
    props.history.push('/hostedlist')
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const saveNewListing = (values) => {
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
    let promiseList = [];
    let isPropertyPhoto = false;
    let isProfilePhoto = false;

    if (values['profilePhoto']) {
      promiseList.push(fileToDataUrl(values['profilePhoto'][0]['originFileObj']));
      isProfilePhoto = true;
    }
    if (values['propertyPhotos']) {
      let subList = []
      values['propertyPhotos'].forEach(element => {
        subList.push(fileToDataUrl(element['originFileObj']));
      })
      promiseList.push(subList);
      isPropertyPhoto = true;
    }
    if (promiseList.length != 0) {
      Promise.all(promiseList).then(res => {
        if (isProfilePhoto) {
          body['thumbnail'] = res[0];
        } else {
          body['thumbnail'] = element.thumbnail
        }
        if (isPropertyPhoto) {
          meta['propertyPhotos'] = res[1];
          body['metadata'] = meta;
        } else {
          meta['propertyPhotos'] = metaData.propertyPhotos;
          body['metadata'] = meta;
        }
        dataDispatch('PUT', `listings/${props.id}`, body)
          .then(props.history.push('/hostedlist'))
          .catch(err => {
            errorPopup(err.response.data.error)
          })
      })
    } else {
      body['thumbnail'] = element.thumbnail;
      meta['propertyPhotos'] = metaData.propertyPhotos;
      body['metadata'] = meta;
      dataDispatch('PUT', `listings/${props.id}`, body)
        .then(props.history.push('/hostedlist'))
        .catch(err => {
          errorPopup(err.response.data.error)
      })
    }
  }

  const onFinish = (values) => {
    saveNewListing(values);
  };

  const onFinishFailed = (errorInfo) => {
    errorPopup(errorInfo['errorFields'][0]['errors']);
  };

  return <Row>
    <Col span={18} offset={1}>
      <StyledForm
        {...formItemLayout}
        name="editForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={preFillValue}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={formEdited}
        autoComplete="off"
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
          <StyledInput />
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
          <StyledInput />
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
          <StyledInput />
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
          <StyledInput />
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
          <StyledInput />
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
          <StyledInput />
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
            placeholder="Country/Region"
            allowClear
            style={{maxWidth:'400px'}}
          >
            {
              countryData().map(elm => (
                <Option value={elm.label} key={elm.value}>{elm.label}</Option> 
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
            placeholder="Choose a general property type"
            allowClear
            style={{maxWidth:'400px'}}
          >
            <Option value="Apartment">Apartment</Option>
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
          />
        </Form.Item>

        <Form.Item name="amenities" label="Property Amenities">
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox value="Wifi" style={{ lineHeight: '32px' }}>
                  Wi-Fi
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="TV" style={{ lineHeight: '32px' }}>
                  TV
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Kitchen" style={{ lineHeight: '32px' }}>
                  Kitchen
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="BBQGrill" style={{ lineHeight: '32px' }}>
                  BBQ Grill
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Parking" style={{ lineHeight: '32px' }}>
                  Parking
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Pool" style={{ lineHeight: '32px' }}>
                  Pool
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="AirConditioning" style={{ lineHeight: '32px' }}>
                  Air conditioning
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="ExerciseEquipment" style={{ lineHeight: '32px' }}>
                  Exercise Equipment
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="DedicatedWorkspace" style={{ lineHeight: '32px' }}>
                  Dedicated Workspace
                </Checkbox>
              </Col>
            </Row>
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
        <Form.Item label="Property Photos">
          <Form.Item name="propertyPhotos" 
            noStyle
            valuePropName="fileList" 
            getValueFromEvent={normFile}
          >
            <Upload.Dragger name="files" 
            maxCount='10'
            multiple
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
          <Input placeholder="Copy your Youtube link here for your profile display" />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Space size={100}>
            <Button onClick={handleCancel}>
              Go back
            </Button>
            <Button type="primary" htmlType="submit" disabled={isSaveButton()} id='submit'>
              Save
            </Button>
          </Space>
        </Form.Item>
      </StyledForm>
    </Col>
  </Row>
}

EditListingForm.propTypes = {
  element: PropTypes.object,
  id: PropTypes.number,
  history: PropTypes.object,
}

export default withRouter(EditListingForm);
