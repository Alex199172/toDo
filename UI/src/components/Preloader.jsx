import React from 'react';
import '../styles/Preloader.css';

const Preloader = ({active, setActive}) => {
  return (
    <div className={active ? 'preloader active' : 'preloader'}>
        <img src="assets/svg/preloader.svg" width="50" />
    </div>
  );
};

export default Preloader;
