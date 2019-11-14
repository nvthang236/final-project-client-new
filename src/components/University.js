import React from 'react';
import { Link } from 'react-router-dom';
import defaultImg from '../images/listOfUniversity.jpeg';
import PropTypes from 'prop-types';

export default function University({ university }) {
  const { name, slug, images, reviewsRating, reviewsCounting } = university;

  return (
    <article className='university'>
      <div className='img-container'>
        <img src={images[0].src || defaultImg} alt={images[0].title} />
        <div className='price-top'>
          <h6>
            {reviewsRating || 0} <i class='fa fa-star'></i>
          </h6>
          <h6>({reviewsCounting || 0} reviews)</h6>
        </div>
        <Link to={`/universities/${slug}`} className='btn-primary university-link'>
          view more
        </Link>
      </div>
      <p className='university-info'>{name}</p>
    </article>
  );
}

University.propTypes = {
  university: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    ratingStar: PropTypes.number.isRequired
  })
};
