import {createStore} from "redux";
import buttonTextReducer from "../reducer/Reducer";
const store=createStore(buttonTextReducer,{storeButtuon1Text:"Log In",storeButtuon2Text:"Sign Up"})

export default store;