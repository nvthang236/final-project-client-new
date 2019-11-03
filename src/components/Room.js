import React from 'react';
import { Link } from 'react-router-dom';
import defaultImg from '../images/room-1.jpeg';
import PropTypes from 'prop-types';

export default function Room({ room }) {
  const { name, slug, images, ratingStar } = room;

  return (
    <article className='room'>
      <div className='img-container'>
        <img src={images[0].src || defaultImg} alt={images[0].title} />
        {/* <div className='price-top'>
          <h6>{ratingStar} star</h6>
          <p>per night</p>
        </div> */}
        <Link to={`/universities/${slug}`} className='btn-primary room-link'>
          view more
        </Link>
      </div>
      <p className='room-info'>{name}</p>
    </article>
  );
}

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    ratingStar: PropTypes.number.isRequired
  })
};
