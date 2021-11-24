
import store from "../store/Store";
const buttonTextReducer=(state,action)=>{
  switch(action.type){
    case "changeButtonTextToLogout":
      return {...{storeButton1Text:"Log Out"}}
    case "changeButtonTextToLogin":
      return {...{storeButton1Text:"Log In"}}
    case "changeButtonTextToHostedList":
      return {...{storeButton2Text:"Hosted List"}}
    default:
      return state
  }
}
export default buttonTextReducer;