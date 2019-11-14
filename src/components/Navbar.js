import React, { Component } from 'react';
import logo from '../images/logo.svg';
import { FaAlignRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import { UniversityContext } from '../context';
import { isEmpty } from 'lodash';

export default class Navbar extends Component {
  state = {
    isOpen: false,
    anchorEl: null
  };

  static contextType = UniversityContext;

  handleMenu = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
    localStorage.removeItem('access_token');
    delete axios.defaults.headers.common['X-Access-Token'];
    this.context.logoutUser();
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { user } = this.context;
    console.log('------------------------------------');
    console.log('user', user);
    console.log('------------------------------------');

    return (
      <nav
        className={Boolean(this.state.anchorEl) ? 'navbar logout' : 'navbar'}
      >
        <div className='nav-center'>
          <div className='nav-header'>
            <Link to='/'>
              <img src={logo} alt='Universities' />
            </Link>
            <button
              type='button'
              className='nav-btn'
              onClick={this.handleToggle}
            >
              <FaAlignRight className='nav-icon' />
            </button>
          </div>
          <ul
            className={this.state.isOpen ? 'nav-links show-nav' : 'nav-links'}
          >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/universities'>Universities</Link>
            </li>
          </ul>
          {isEmpty(user) ? (
            <div
              className={this.state.isOpen ? 'nav-sign show-nav' : 'nav-sign'}
            >
              <Link to='/sign-in'>Sign In</Link>/
              <Link to='/sign-up'>Sign Up</Link>
            </div>
          ) : (
            <div
              className={this.state.isOpen ? 'nav-sign show-nav' : 'nav-sign'}
            >
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={this.handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <span className='username'>{`${user.firstName} ${user.lastName}`}</span>
              <Menu
                id='menu-appbar'
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </nav>
    );
  }
}
