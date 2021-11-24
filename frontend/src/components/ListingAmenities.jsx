import React from 'react';
import {Row, Col, Checkbox } from 'antd';


const ListingAmenities = () => {
  return (
    <div>
      <Row>
        <Col span={8}>
          <Checkbox value="Wifi" style={{ lineHeight: '32px' }} id='wifi'>
            Wi-Fi
          </Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="TV" style={{ lineHeight: '32px' }} id='tv'>
            TV
          </Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="Kitchen" style={{ lineHeight: '32px' }} id='kitchen'>
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
    </div>
  )
}

export default ListingAmenities;
