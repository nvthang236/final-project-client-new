import React, { Component } from 'react';
import Title from './Title';
import { FaHandshake, FaSearch, FaUserTimes } from 'react-icons/fa';

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaHandshake />,
        title: 'trust',
        info:
          'Provide authentic information about the university for students to refer'
      },
      {
        icon: <FaSearch />,
        title: 'convenience',
        info: 'Convenient comparison of tuition fees for undergraduate majors'
      },
      {
        icon: <FaUserTimes />,
        title: 'saving',
        info: 'Help students save time searching for information'
      }
    ]
  };
  render() {
    return (
      <section className='services'>
        <Title title='services' />
        <div className='services-center'>
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className='service'>
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
