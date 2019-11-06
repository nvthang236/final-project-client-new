import React, { Component } from 'react';
import defaultBcg from '../images/listOfUniversity.jpeg';
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
      id: this.props.match.params.universityId,
      loading: true,
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

  async componentDidMount() {
    const { getRoomById } = await this.context;
    const room = getRoomById(this.state.id);
    if (room) {
      this.setState({
        loading: false
      });
      const { name } = room;
      this.setState({
        university: name
      });
    }
  }

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
    const { addReview } = this.context;
    addReview(this.state, this);
  };

  render() {
    if (this.state.loading) {
      return (
        <div className='error'>
          <h3>no such university could be found...</h3>
          <Link to='/universities' className='btn-primary'>
            back to universities
          </Link>
        </div>
      );
    }
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
