import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import UniversityContainer from '../components/UniversityContainer';

const Universities = () => {
  return (
    <>
      <Hero hero='universitiesHero'>
        <Banner title='list of universities'>
          <Link to='/' className='btn-primary'>
            return home
          </Link>
        </Banner>
      </Hero>
      <UniversityContainer />
    </>
  );
};

export default Universities;
