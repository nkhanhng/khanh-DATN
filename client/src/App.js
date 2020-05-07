import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from 'react-redux';
import store from './store'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';

import PrivateRoute from './component/common/PrivateRoute'

import NavBar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import DashBoard from './component/dashboard/Dashboard'

import './App.css';
import { clearCurrentProfile } from './actions/profileAction';
import CreateProfile from './component/creat-profile/CreateProfile';
import EditProfile from './component/edit-profile/edit-profile'
import AddExperience from './component/add-credentials/AddExperience'
import AddEducation from './component/add-credentials/AddEducation';
import Profiles from './component/profiles/Profiles';
import Profile from './component/profile/Profile';
import NotFound from './component/not-found/NotFound';
import Posts from './component/posts/Posts';
import Post from './component/post/Post';

//Check for token
if(localStorage.jwtToken){
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //Logout
    store.dispatch(logoutUser());
    //Todo: clear current profile
    store.dispatch(clearCurrentProfile())
    //redirect to login
    window.location.href = '/login'
  }

}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
              <NavBar/>
                <Route exact path="/" component={Landing}/>
                <div className="container">
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
                  <Route path="/profiles" component={Profiles}/>
                  <Route path="/profile/:handle" component={Profile}/>
                  <Switch>
                    <PrivateRoute exact path="/dashboard" component={DashBoard}/>
                  </Switch>
                  <Switch>
                    <PrivateRoute path="/create-profile" component={CreateProfile}/>
                  </Switch>
                  <Switch>
                    <PrivateRoute path="/edit-profile" component={EditProfile}/>
                  </Switch>
                  <Switch>
                    <PrivateRoute path="/add-experience" component={AddExperience}/>
                  </Switch>
                  <Switch>
                    <PrivateRoute path="/add-education" component={AddEducation}/>
                  </Switch>
                  <Switch>
                    <PrivateRoute path="/feed" component={Posts}/>
                  </Switch>
                  <Switch>
                    <PrivateRoute path="/post/:id" component={Post}/>
                  </Switch>
                  <Route path="/error" component={NotFound}/>
                </div>
              <Footer/>
          </div>
        </Router>
      </Provider>
      
      
    );
  }
}

export default App;
