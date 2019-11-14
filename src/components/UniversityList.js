import React from 'react';
import University from './University';

export default function UniversityList({ universities }) {
  if (universities.length === 0) {
    return (
      <div className='empty-search'>
        <h3>unfortunately no universities matched your search parameters</h3>
      </div>
    );
  }

  return (
    <section className='universitieslist'>
      <div className='universitieslist-center'>
        {universities.map(item => (
          <University key={item.id} university={item} />
        ))}
      </div>
    </section>
  );
}
