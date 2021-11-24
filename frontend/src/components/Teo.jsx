import React, {Component} from 'react';
import {Button} from "antd";
import {createStore} from "redux";

const buttonTextReducer=(state,action)=>{
  switch(action.type){
    case "changeButtonText":{
      return {...state,...{s:"7"}}
    }
    default:
      return state
  }
}
const buttonTextAction={
  type:"changeButtonText"

}
const store=createStore(buttonTextReducer,{s:"0"})
class Teo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ww:"00"
    }
  }

  handleclick=(e)=>{
    store.dispatch(buttonTextAction);
    this.setState({'ww':store.getState().s})
  }
  render() {
    return (
      <div>
        {this.state.ww}
        <Button type="primary" onClick={this.handleclick}>
          test2
        </Button>
      </div>
    );
  }
}

export default Teo;