import React from 'react';
import './App.css';
import { Menu} from 'antd';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
// import {Link} from 'react-router-dom'
import Login from './pages/LogIn';
import { BrowserRouter as Router,Route,withRouter} from 'react-router-dom';
import HomeHeader from './components/HomeHeader';
import Signup from './pages/SignUp';
import Hostedlist from './pages/HostedList';
import CreateNewListing from "./pages/CreateNewListing";
import Housinglist from './pages/HousingList';
import HouseDetail from "./pages/HouseDetail";
import EditListingPage from './pages/EditListingPage';
import HostManagement from './pages/HostManagement';

class App extends React.Component {




  render() {
    return (
      <Router>
        <HomeHeader />
        <div>
          <Route exact path="/" component={Housinglist} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/hostedlist" component={Hostedlist} />
          <Route path="/createnewlisting" component={CreateNewListing} />
          <Route path="/housinglist" component={Housinglist} />
          <Route exact path="/house/:id" component={HouseDetail} />
          <Route path="/editlisting/:id" component={EditListingPage} />
          <Route path="/hostmanagement/:id" component={HostManagement} />
        </div>
      </Router>
    );
  }
}


export default App;



