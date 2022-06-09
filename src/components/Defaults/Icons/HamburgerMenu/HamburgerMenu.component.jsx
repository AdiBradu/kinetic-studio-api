import React, { useContext } from 'react';
import './HamburgerMenu.component.scss';
import { AppContext } from '../../../../AppContext';

export default function HamburgerMenu({ color }) {
  const { isToggledObj, isMenuOpenObj } = useContext(AppContext);
  const [isToggled, setIsToggled] = isToggledObj;
  const [isMenuOpen, setIsMenuOpen] = isMenuOpenObj;

  const handleToggleAction = (e) => {
    e.preventDefault();
    setIsToggled(!isToggled);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <button className="menu-toggler" onClick={handleToggleAction}>
      <svg
        className="hamburger-menu"
        viewBox="0 0 24 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 1.36364C0 0.886663 0.383756 0.5 0.857143 0.5H23.1429C23.6162 0.5 24 0.886663 24 1.36364C24 1.84061 23.6162 2.22727 23.1429 2.22727H0.857143C0.383756 2.22727 0 1.84061 0 1.36364Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 10C0 9.52303 0.383756 9.13636 0.857143 9.13636H23.1429C23.6162 9.13636 24 9.52303 24 10C24 10.477 23.6162 10.8636 23.1429 10.8636H0.857143C0.383756 10.8636 0 10.477 0 10Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 18.6364C0 18.1594 0.383756 17.7727 0.857143 17.7727H23.1429C23.6162 17.7727 24 18.1594 24 18.6364C24 19.1133 23.6162 19.5 23.1429 19.5H0.857143C0.383756 19.5 0 19.1133 0 18.6364Z"
          fill={color}
        />
      </svg>
    </button>
  );
}
