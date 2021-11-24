
import { shallow } from 'enzyme';
import React from 'react';
import { Button, Form, Input } from 'antd';
import SignupCard from './components/SignupCard';

describe('Register Card', () => {
    
    const login = shallow(<SignupCard />);

    it('has an input field labeled Email', () => {
        const isEmail = login.find(Form).props().children.filter(element => {return element.props.label === 'Email'});
        expect(isEmail[0].props.label === 'Email').toEqual(true)
    })

    it('has an input field type is "password"', () => {
        const isEmail = login.find(Form).props().children.filter(element => {return element.props.label === 'Password'});
        expect(isEmail[0].props.label === 'Password').toEqual(true)
    })

    it('has an input field type is "name"', () => {
        const isEmail = login.find(Form).props().children.filter(element => {return element.props.label === 'Name'});
        expect(isEmail[0].props.label === 'Name').toEqual(true)
    })

    it('has a submit button', () => {
        expect(login.find(Button).text()).toEqual('Register')
    })

})