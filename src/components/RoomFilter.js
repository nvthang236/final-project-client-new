import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from '../components/Title';
// get all unique values
const getUnique = (items, value) => [
  ...new Set(items.map(item => item[value]))
];
export default function RoomFilter({ rooms }) {
  const context = useContext(RoomContext);
  const {
    handleChange,
    city,
    groupMajor,
    major,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context;
  // get unique types
  let cities = getUnique(rooms, 'city');
  // add all
  cities = ['All', ...cities];
  // map to jsx
  cities = cities.map((item, index) => (
    <option value={item} key={index}>
      {item}
    </option>
  ));
  // get unique group major
  let groupMajorList = [...new Set(rooms.map(item => item.groupMajor.name))];
  // add all
  groupMajorList = ['All', ...groupMajorList];
  groupMajorList = groupMajorList.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  // get unique major
  let majorList = [
    ...new Set(
      rooms
        .map(item =>
          groupMajor === 'All'
            ? item.major.map(element => element.name.name)
            : item.groupMajor.name === groupMajor
            ? item.major.map(element => element.name.name)
            : null
        )
        .flat()
        .filter(item => item)
    )
  ];
  majorList = ['All', ...majorList];
  majorList = majorList.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  return (
    <section className='filter-container'>
      <Title title='search universities' />
      <form className='filter-form'>
        {/* select type */}
        <div className='form-group'>
          <label htmlFor='city'>city</label>
          <select
            name='city'
            id='city'
            onChange={handleChange}
            className='form-control'
            value={city}
          >
            {cities}
          </select>
        </div>
        {/* end of select type */}
        {/* select group major */}
        <div className='form-group'>
          <label htmlFor='groupMajor'>group major</label>
          <select
            name='groupMajor'
            id='groupMajor'
            onChange={handleChange}
            className='form-control'
            value={groupMajor}
          >
            {groupMajorList}
          </select>
        </div>
        {/* end of select group major */}
        {/* guests  */}
        <div className='form-group'>
          <label htmlFor='major'>major</label>
          <select
            name='major'
            id='major'
            onChange={handleChange}
            className='form-control'
            value={major}
          >
            {majorList}
          </select>
        </div>
        {/* end of guests */}
        {/* room price */}
        <div className='form-group'>
          <label htmlFor='price'>tuition ${price}</label>
          <input
            type='range'
            name='price'
            min={minPrice}
            max={maxPrice}
            id='price'
            value={price}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        {/* end of room price*/}
        {/* size */}
        {/* <div className="form-group">
          <label htmlFor="price">room size </label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div> */}
        {/* end of select type */}
        {/* extras */}
        {/* <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">pets</label>
          </div>
        </div> */}
        {/* end of extras type */}
      </form>
    </section>
  );
}
