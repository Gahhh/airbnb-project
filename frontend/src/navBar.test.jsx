import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeHeader from './components/HomeHeader';
import { shallow } from 'enzyme';
import { Button } from 'antd';

describe('Navbar test', () => {
  
  it('has button lgoin', () => {
    const navBar = shallow(<HomeHeader />)
    expect(navBar.find(Button).at(0).props().name).toEqual('login');
  }) 

  it('has button signup', () => {
    const navBar = shallow(<HomeHeader />)
    expect(navBar.find(Button).at(1).props().name).toEqual('signup');
  }) 

  it('has button housinglist', () => {
    const navBar = shallow(<HomeHeader />)
    expect(navBar.find(Button).at(2).props().name).toEqual('housinglist');
  }) 
})
