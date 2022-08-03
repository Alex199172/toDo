import React from 'react';
import {useState, useEffect} from 'react';
import '../styles/Search.css';

const Search = ( {result} ) => {
  const [searchValue, setSearchValue] = useState('')

  // useEffect(() => {
  //   setSearchValue(() => setSearchValue(
  //     result.filter(elem => elem.toLowerCase().includes(searchValue.toLowerCase()))
  //   ))
  // }, [result])


  return (
    <div className="input-group mb-3 pe-3 px-3">
      <input
          type="text"
          className="form-control"
          placeholder="Search..."
          aria-label="Search..."
          aria-describedby="basic-addon2"
          value = {searchValue}
          onChange = {event => setSearchValue(event.target.value)}
          />
      <span className="input-group-text">
         <img className="loupe__img" src="assets/img/loupe.png" alt="loupe" />
      </span>
    </div>
  );
};

export default Search;
