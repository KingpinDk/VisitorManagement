// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import './apply.css';

function Sidebar() {
  return (
    <nav className="sidebar sidebg">
      <ul className='sidetxt'>
        <li><Link to="/">watchin</Link></li>
        <li><Link to="/watchout">watchout</Link></li>
        <li><Link to="/staff">staff</Link></li>
        
        
      </ul>
    </nav>
    
  );
}

export default Sidebar;
