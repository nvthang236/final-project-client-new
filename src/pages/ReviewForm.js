import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import StyledHero from '../components/StyledHero';
import Rating from 'react-rating';
import { TextField, Button } from '@material-ui/core';

export default class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // slug: this.props.match.params.slug,
      defaultBcg,
      displayName: '',
      university: '',
      major: '',
      graduationYear: '',
      review: '',
      ratingStar: 0
    };
  }

  static contextType = RoomContext;
  // componentDidMount() {}

  handleChange = event => {
    let change = null;
    if (Number.isInteger(event)) {
      change = { ratingStar: event };
    } else {
      change = { [event.target.name]: event.target.value };
    }
    this.setState({ ...this.state, ...change });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('------------------------------------');
    console.log('A name was submitted: ' + JSON.stringify(this.state));
    console.log('------------------------------------');
  };

  render() {
    const {} = this.context;
    return (
      <>
        {/* <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={name}>
            <Link to='/universities' className='btn-primary'>
              back to universities
            </Link>
          </Banner>
        </StyledHero> */}
        <div className='review-form-container'>
          <h1>Review Your University to Help Future Students</h1>
          <div className='review-form'>
            <form onSubmit={this.handleSubmit}>
              <div className='reviewer-info'>
                <div className='text-field'>
                  <TextField
                    id='outlined-search'
                    label='Display Name'
                    margin='normal'
                    variant='outlined'
                    name='displayName'
                    value={this.state.displayName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className='text-field'>
                  <TextField
                    id='outlined-search'
                    label='University'
                    margin='normal'
                    variant='outlined'
                    name='university'
                    value={this.state.university}
                    onChange={this.handleChange}
                  />
                </div>
                <div className='text-field'>
                  <TextField
                    id='outlined-search'
                    label='Major'
                    margin='normal'
                    variant='outlined'
                    name='major'
                    value={this.state.major}
                    onChange={this.handleChange}
                  />
                </div>
                <div className='text-field'>
                  <TextField
                    id='outlined-search'
                    label='Graduation Year'
                    margin='normal'
                    variant='outlined'
                    name='graduationYear'
                    value={this.state.graduationYear}
                    onChange={this.handleChange}
                  />
                </div>
                <div className='text-area'>
                  <TextField
                    id='outlined-search'
                    label='Review'
                    margin='normal'
                    variant='outlined'
                    multiline
                    rows='8'
                    name='review'
                    value={this.state.review}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className='university-rating'>
                <label>How would you rate your university?</label>
                <div>
                  <Rating
                    emptySymbol='fa fa-star-o fa-2x'
                    fullSymbol='fa fa-star fa-2x'
                    style={{
                      color: '#EFAC4D'
                    }}
                    name='ratingStar'
                    onChange={this.handleChange}
                    initialRating={this.state.ratingStar}
                  />
                </div>
              </div>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
