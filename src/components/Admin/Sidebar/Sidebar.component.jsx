import React from 'react';
import './Sidebar.component.scss';
import NavLink from '../NavLink/NavLink.component.jsx';
import navlinks from '../../../data/navlinks.json';

export default function Sidebar() {
  return (
    <div className="sidebar">
      {navlinks.map((navlink, index) => (
        <NavLink key={index} navlink={navlink.route} />
      ))}
    </div>
  );
}
