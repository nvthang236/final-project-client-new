import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import StyledHero from '../components/StyledHero';
import Rating from 'react-rating';

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    };
  }

  static contextType = RoomContext;
  // componentDidMount() {}

  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    if (!room) {
      return (
        <div className='error'>
          <h3>no such university could be found...</h3>
          <Link to='/universities' className='btn-primary'>
            back to universities
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    } = room;
    const [mainImg, ...defaultImg] = images;
    return (
      <>
        <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={name}>
            <Link to='/universities/add-review' className='btn-primary'>
              Write a Review
            </Link>
          </Banner>
        </StyledHero>
        <div className='reviews'>
          <h2 className='reviews-header'>Student & Graduate Reviews</h2>
          <div className='reviews-item'>
            <div className='reviews-item-left'>
              <span className='reviews-rating'>
                <Rating
                  initialRating={4.5}
                  readonly
                  emptySymbol='fa fa-star-o fa-2x'
                  fullSymbol='fa fa-star fa-2x'
                  style={{
                    color: '#EFAC4D'
                  }}
                />
                <span class='reviews-text-rating'>4.5 out of 5 stars</span>
              </span>
              <div class='reviews-text-name'>
                <strong>Thang Nguyen</strong> -{' '}
                <span class='reviews-text--secondary'>01/10/2019 </span>
              </div>
            </div>
            <div className='reviews-item-right'>
              <div class='reviews-text-program'>
                <strong>Degree:</strong> <span>Software Engineer</span>
                <div>
                  <strong>Graduation Year:</strong> <span>2020</span>
                </div>
              </div>
            </div>
            <div className='reviews-item-clear'></div>
            <div class='reviews-text-review'>
              <span class='reviews-text-quotation'>"</span>Lorem ipsum dolor sit
              amet, consectetuer adipiscing elit. Aenean commodo ligula eget
              dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Donec quam felis,
              ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat
              massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
              vulputate eget, arcu!
              <span class='reviews-text-quotation'>"</span>
            </div>
          </div>
        </div>
        {/* <section className='single-room'>
          <div className='single-room-images'>
            {defaultImg.map((item, index) => (
              <img key={index} src={item} alt={name} />
            ))}
          </div>
          <div className='single-room-info'>
            <article className='desc'>
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className='info'>
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} SQFT</h6>
              <h6>
                max capacity :{' '}
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? 'pets allowed' : 'no pets allowed'}</h6>
              <h6>{breakfast && 'free breakfast included'}</h6>
            </article>
          </div>
        </section> */}
        {/* <section className='room-extras'>
          <h6>extras</h6>
          <ul className='extras'>
            {extras.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </section> */}
      </>
    );
  }
}
