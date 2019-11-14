import React, { Component } from 'react';
import { UniversityContext } from '../context';
import Loading from './Loading';
import University from './University';
import Title from './Title';

export default class FeaturedUniversities extends Component {
  static contextType = UniversityContext;

  render() {
    let { loading, featuredUniversities: universities } = this.context;
    universities = universities.map(university => <University key={university.id} university={university} />);

    return (
      <section className='featured-universities'>
        <Title title='recommended for you' />
        <div className='featured-universities-center'>
          {loading ? <Loading /> : universities}
        </div>
      </section>
    );
  }
}
