import React, { Component } from 'react';
import items from './data';
import axios from 'axios';
import provinces from './provinces';

const UniversityContext = React.createContext();

export default class UniversityProvider extends Component {
  state = {
    user: {},
    universities: [],
    sortedUniversities: [],
    featuredUniversities: [],
    loading: true,
    city: 'All',
    groupMajor: 'All',
    major: 'All',
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  loginUser = user => {
    this.setState({
      user,
    });
  };

  logoutUser = () => {
    this.setState({
      user: {},
    });
  };

  async componentDidMount() {
    // this.getData
    // const universities = this.formatData(items);
    const params = {
      populates: [{ path: 'major.name' }, { path: 'groupMajor' }],
    };
    let getUniversityResponse = null;
    let getUserResponse = null;
    getUniversityResponse = await axios
      .get('/universities', {
        params,
      })
      .then(res => res.data);
    try {
      const token = localStorage.getItem('access_token');
      axios.defaults.headers.common['X-Access-Token'] = token;
      getUserResponse = await axios.get('/auth/user').then(res => res.data);
    } catch (err) {
      console.log('------------------------------------');
      console.log('err', err);
      console.log('------------------------------------');
      getUserResponse = {};
    }
    // const getResponse = await axios.get('/universities', { params });
    const universities = this.formatData(getUniversityResponse);
    // const featuredUniversities = universities.filter(university => university.featured === true);
    const maxPrice = Math.max(
      ...universities
        .map(item => item.major.map(element => element.price))
        .flat()
    );
    // const maxSize = Math.max(...universities.map(item => item.size));
    this.setState({
      universities,
      sortedUniversities: universities,
      loading: false,
      price: maxPrice,
      maxPrice,
      user: getUserResponse,
      // maxSize
      // featuredUniversities,
    });
    console.log('------------------------------------');
    console.log('context componentDidMount universities', universities);
    console.log('------------------------------------');
  }

  formatData(items) {
    console.log('------------------------------------');
    console.log('context formatData items', items);
    console.log('------------------------------------');
    const tempItems = items.map(item => {
      const major = item.major.map(elem => ({
        ...elem,
        id: elem._id,
      }));
      let city = null;
      for (const province of provinces) {
        if (province.id === item.city) {
          city = province.name;
        }
      }
      const reviews = item.reviews.map(elem => ({
        ...elem,
        id: elem._id,
      }));
      const university = { ...item, major, city, reviews };
      return university;
    });
    return tempItems;
  }

  getUniversity = slug => {
    const tempUniversities = [...this.state.universities];
    const university = tempUniversities.find(university => university.slug === slug);
    return university;
  };

  getUniversityById = id => {
    const tempUniversities = [...this.state.universities];
    console.log('------------------------------------');
    console.log('context getUniversityById tempUniversities', tempUniversities);
    console.log('------------------------------------');
    const university = tempUniversities.find(university => university.id === id);
    return university;
  };

  addReview = (data, pointerThis) => {
    const id = data.id;
    const university = this.getUniversityById(id);
    university.reviews.push(data);
    university.reviewsCounting = university.reviews.length;
    university.reviewsRating =
      ((university.reviewsRating || 0) + data.ratingStar) / university.reviews.length;
    pointerThis.props.history.push(`/universities/${university.slug}`);
    axios.put(`/universities/${id}`, university);
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterUniversities
    );
  };

  filterUniversities = () => {
    const {
      universities,
      city,
      groupMajor,
      major,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;
    // all the universities
    let tempUniversities = [...universities];
    // transform value
    // capacity = parseInt(capacity);
    // filter by city
    if (city !== 'All') {
      tempUniversities = tempUniversities.filter(university => university.city === city);
    }
    // filter by groupMajor
    if (groupMajor !== 'All') {
      tempUniversities = tempUniversities.filter(
        university => university.groupMajor.name === groupMajor
      );
    }
    // filter by major
    if (major !== 'All') {
      tempUniversities = tempUniversities.filter(university => {
        let check = false;
        for (const m of university.major) {
          if (m.name.name === major) {
            check = true;
            break;
          }
        }
        return check;
      });
    }
    // filter by price
    tempUniversities = tempUniversities.filter(university => {
      let check = false;
      for (const m of university.major) {
        if (m.price <= price) {
          check = true;
          break;
        }
      }
      return check;
    });
    //filter by size
    // tempUniversities = tempUniversities.filter(
    //   university => university.size >= minSize && university.size <= maxSize
    // );
    // //filter by breakfast
    // if (breakfast) {
    //   tempUniversities = tempUniversities.filter(university => university.breakfast === true);
    // }
    // //filter by pets
    // if (pets) {
    //   tempUniversities = tempUniversities.filter(university => university.pets === true);
    // }
    this.setState({
      sortedUniversities: tempUniversities,
    });
  };

  render() {
    return (
      <UniversityContext.Provider
        value={{
          ...this.state,
          getUniversity: this.getUniversity,
          getUniversityById: this.getUniversityById,
          addReview: this.addReview,
          handleChange: this.handleChange,
          loginUser: this.loginUser,
          logoutUser: this.logoutUser,
        }}
      >
        {this.props.children}
      </UniversityContext.Provider>
    );
  }
}

const UniversityConsumer = UniversityContext.Consumer;

export function withUniversityConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <UniversityConsumer>
        {value => <Component {...props} context={value} />}
      </UniversityConsumer>
    );
  };
}

export { UniversityProvider, UniversityConsumer, UniversityContext };
