import React, { Component } from 'react';
import items from './data';
import axios from 'axios';
import provinces from './provinces';

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
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
    pets: false
  };

  // getData

  async componentDidMount() {
    // this.getData
    // const rooms = this.formatData(items);
    const params = {
      populates: [{ path: 'major.name' }, { path: 'groupMajor' }]
    };
    const getResponse = await axios.get('/universities', { params });
    const rooms = this.formatData(getResponse.data);
    // const featuredRooms = rooms.filter(room => room.featured === true);
    const maxPrice = Math.max(
      ...rooms.map(item => item.major.map(element => element.price)).flat()
    );
    // const maxSize = Math.max(...rooms.map(item => item.size));
    this.setState({
      rooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice
      // maxSize
      // featuredRooms,
    });
  }

  formatData(items) {
    const tempItems = items.map(item => {
      const id = item._id;
      const groupMajor = item.groupMajor.name;
      const major = item.major.map(elem => ({
        ...elem,
        id: elem._id,
        name: elem.name.name
      }));
      let city = null;
      for (const province of provinces) {
        if (province.id === item.city) {
          city = province.name;
        }
      }
      const university = { ...item, id, groupMajor, major, city };
      return university;
    });
    return tempItems;
  }

  getRoom = slug => {
    const tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    const {
      rooms,
      city,
      groupMajor,
      major,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    // all the rooms
    let tempRooms = [...rooms];
    // transform value
    // capacity = parseInt(capacity);
    // filter by city
    if (city !== 'All') {
      tempRooms = tempRooms.filter(room => room.city === city);
    }
    // filter by groupMajor
    if (groupMajor !== 'All') {
      tempRooms = tempRooms.filter(room => room.groupMajor === groupMajor);
    }
    // filter by major
    if (major !== 'All') {
      tempRooms = tempRooms.filter(room => {
        let check = false;
        for (const m of room.major) {
          if (m.name === major) {
            check = true;
            break;
          }
        }
        return check;
      });
    }
    // filter by price
    tempRooms = tempRooms.filter(room => {
      let check = false;
      for (const m of room.major) {
        if (m.price <= price) {
          check = true;
          break;
        }
      }
      return check;
    });
    //filter by size
    // tempRooms = tempRooms.filter(
    //   room => room.size >= minSize && room.size <= maxSize
    // );
    // //filter by breakfast
    // if (breakfast) {
    //   tempRooms = tempRooms.filter(room => room.breakfast === true);
    // }
    // //filter by pets
    // if (pets) {
    //   tempRooms = tempRooms.filter(room => room.pets === true);
    // }
    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
