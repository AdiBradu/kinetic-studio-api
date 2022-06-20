import React from 'react';
import './Menu.component.scss';
import NavLink from '../NavLink/NavLink.component';
import navlinks from '../../../data/navlinks.json';

export default function Menu() {
  return (
    <div className="menu-admin">
      {navlinks.map((navlink, index) => (
        <NavLink key={index} navlink={navlink.route} icon={navlink.icon} />
      ))}
    </div>
  );
}
