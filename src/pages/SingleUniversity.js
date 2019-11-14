import React, { Component } from 'react';
import defaultBcg from '../images/listOfUniversity.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { UniversityContext } from '../context';
import StyledHero from '../components/StyledHero';
import ReviewList from '../components/ReviewList';

export default class SingleUniversity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    };
  }

  static contextType = UniversityContext;
  // componentDidMount() {}

  render() {
    const { getUniversity } = this.context;
    const university = getUniversity(this.state.slug);
    console.log('------------------------------------');
    console.log('university', university);
    console.log('------------------------------------');
    if (!university) {
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
      id,
      name,
      images,
      reviews,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets
    } = university;
    const [mainImg, ...defaultImg] = images;
    return (
      <>
        <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={name}>
            <Link to={`/universities/add-review/${id}`} className='btn-primary'>
              Write a Review
            </Link>
          </Banner>
        </StyledHero>
        <div className='reviews'>
          <h2 className='reviews-header'>Student & Graduate Reviews</h2>
          <ReviewList reviews={reviews} id={id} />
        </div>
        {/* <section className='single-university'>
          <div className='single-university-images'>
            {defaultImg.map((item, index) => (
              <img key={index} src={item} alt={name} />
            ))}
          </div>
          <div className='single-university-info'>
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
        {/* <section className='university-extras'>
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
