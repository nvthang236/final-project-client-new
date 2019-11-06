import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import dayjs from 'dayjs';

export default function ReviewList({ reviews, id }) {
  if (reviews.length === 0) {
    return (
      <div className='review-empty'>
        <div>Sorry, this university doesn't have any reviews yet.</div>
        <div>
          Help future students by{' '}
          <Link to={`/universities/add-review/${id}`}>adding your review</Link>!
        </div>
      </div>
    );
  }

  return reviews.map(elem => (
    <div key={elem.id} className='reviews-item'>
      <div className='reviews-item-left'>
        <span className='reviews-rating'>
          <Rating
            initialRating={elem.ratingStar}
            readonly
            emptySymbol='fa fa-star-o fa-2x'
            fullSymbol='fa fa-star fa-2x'
            style={{
              color: '#EFAC4D'
            }}
          />
          <span className='reviews-text-rating'>
            {elem.ratingStar} out of 5 stars
          </span>
        </span>
        <div className='reviews-text-name'>
          <strong>{elem.displayName}</strong> -{' '}
          <span className='reviews-text--secondary'>
            {dayjs(elem.reviewDate).format('DD/MM/YYYY')}
          </span>
        </div>
      </div>
      <div className='reviews-item-right'>
        <div className='reviews-text-program'>
          <strong>Degree:</strong> <span>{elem.major}</span>
          <div>
            <strong>Graduation Year:</strong> <span>{elem.graduationYear}</span>
          </div>
        </div>
      </div>
      <div className='reviews-item-clear'></div>
      <div className='reviews-text-review'>
        <span className='reviews-text-quotation'>"</span>
        {elem.review}
        <span className='reviews-text-quotation'>"</span>
      </div>
    </div>
  ));
}
