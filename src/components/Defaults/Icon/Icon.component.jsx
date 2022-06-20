import React, { useState, useEffect } from 'react';
import variables from '../../../styles/_variables.module.scss';

import { ReactComponent as IconSpecializari } from '../../../assets/Icons/iconSpecializari.svg';
import { ReactComponent as IconZone } from '../../../assets/Icons/iconZone.svg';
import { ReactComponent as IconServicii } from '../../../assets/Icons/iconServicii.svg';
import { ReactComponent as IconTerapeuti } from '../../../assets/Icons/iconTerapeuti.svg';
import { ReactComponent as IconComenzi } from '../../../assets/Icons/iconComenzi.svg';
import { ReactComponent as IconEmails } from '../../../assets/Icons/iconEmails.svg';
import { ReactComponent as IconAdmin } from '../../../assets/Icons/iconAdmin.svg';
import { ReactComponent as IconLogout } from '../../../assets/Icons/iconLogout.svg';

export default function Icon({ navlink, color }) {
  const [icon, setIcon] = useState();

  const checkIcon = () => {
    switch (navlink) {
      case 'specializari':
        return <IconSpecializari fill={color} />;
      case 'zone':
        return <IconZone fill={color} />;
      case 'servicii':
        return <IconServicii stroke={color} />;
      case 'terapeuti':
        return <IconTerapeuti fill={color} />;
      case 'comenzi':
        return <IconComenzi stroke={color} />;
      case 'emails':
        return <IconEmails fill={color} />;
      case 'admin':
        return <IconAdmin fill={color} />;
      case 'log out':
        return <IconLogout stroke={color} />;
      default:
        break;
    }
  };

  useEffect(() => {
    const icon = checkIcon();
    setIcon(icon);
  }, [navlink, color]);

  return <div>{icon}</div>;
}
