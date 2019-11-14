import React from 'react';
import './App.css';
import Home from './pages/Home';
import Universities from './pages/Universities';
import SingleUniversity from './pages/SingleUniversity';
import ReviewForm from './pages/ReviewForm';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Error from './pages/Error';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import { isEmpty } from 'lodash';
import { UniversityContext } from './context';

function App() {
  const context = React.useContext(UniversityContext);
  const { user } = context;

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        !isEmpty(user) ? <Component {...props} /> : <Redirect to='/sign-in' />
      }
    />
  );

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/universities' component={Universities} />
        <PrivateRoute
          exact
          path='/universities/add-review/:universityId'
          component={ReviewForm}
        />
        <Route exact path='/universities/:slug' component={SingleUniversity} />
        <Route exact path='/sign-in' component={SignIn} />
        <Route exact path='/sign-up' component={SignUp} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
