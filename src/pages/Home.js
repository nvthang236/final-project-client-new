import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedUniversities from '../components/FeaturedUniversities';

const Home = () => {
  return (
    <>
      <Hero>
        <Banner
          title='welcome to universities'
          subtitle='choose the right university for you'
        >
          <Link to='/universities' className='btn-primary'>
            universities
          </Link>
        </Banner>
      </Hero>
      <Services />
      {/* <FeaturedUniversities /> */}
    </>
  );
};

export default Home;
