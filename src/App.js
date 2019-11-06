import React from 'react';
import './App.css';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import ReviewForm from './pages/ReviewForm';
import Error from './pages/Error';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/universities' component={Rooms} />
        <Route
          exact
          path='/universities/add-review/:universityId'
          component={ReviewForm}
        />
        <Route exact path='/universities/:slug' component={SingleRoom} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
