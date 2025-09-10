
import React from 'react';
import { FaPen } from 'react-icons/fa';

const TabBar = ({ onSelect }) => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className="nav-link active" href="#" onClick={() => onSelect('post')}><FaPen /> Post</a>
      </li>
    </ul>
  );
};

export default TabBar;
