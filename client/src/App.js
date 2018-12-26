import React, { Component } from 'react';
import MyNavBar from './NavBar/MyNavBar';
import './App.css';
// import SlideShow from './SlideShow/SlideShow';
<<<<<<< HEAD
// import Form from './js/components/form'
// import List from './js/components/list'
=======
// // import Form from './js/components/form'
// // import List from './js/components/list'
>>>>>>> a3d8d5fbb485e88b1bbddf6924ca85324e98ebc2

import Home from './SlideShow/Home';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from './components/Signup'
import Organization from './components/organizations'
import UserProfile from './userProfile/UserProfile';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MyNavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/organizations' component={Organization} />
            <Route path='/Signup' component={Signup} />
            <Route path='/profile' component={UserProfile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;