import React from 'react';
import { render, screen } from '@testing-library/react';
import ListingAmenities from './components/ListingAmenities';
import { shallow } from 'enzyme';
import { Checkbox } from 'antd';


describe('publishListing', () => {
  
  it('has checkbox named Wifi', () => {
    const listing = shallow(<ListingAmenities />)
    expect(listing.find(Checkbox).at(0).props().value).toEqual("Wifi")
  }) 

  it('has checkbox named TV', () => {
    const listing = shallow(<ListingAmenities />)
    expect(listing.find(Checkbox).at(1).props().value).toEqual("TV")
  }) 

  it('has checkbox named Kitchen', () => {
    const listing = shallow(<ListingAmenities />)
    expect(listing.find(Checkbox).at(2).props().value).toEqual("Kitchen")
  }) 

  it('has checkbox named Parking', () => {
    const listing = shallow(<ListingAmenities />)
    expect(listing.find(Checkbox).at(4).props().value).toEqual("Parking")
  }) 
})