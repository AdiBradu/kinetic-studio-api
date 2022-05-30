export const getElementHeight = (input) => {
  const element =  document.getElementById(input);
  const offsetHeight = element.offsetHeight;
  return offsetHeight
}

export const setElementHeight = (input, name, height) => {
  const element =  document.getElementById(input);
  element.style.setProperty(name, `${height}px`)
}

export const setDashboardHeight = () => {
  const navbar = document.getElementById('navbar');
  const navbarHeight = navbar.offsetHeight;
  const dashboard = document.getElementById('dashboard');
  dashboard.style.setProperty('--dashboard-height', `${window.innerHeight - navbarHeight}px`) 
}

export const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
};

export const resizeRadar = (input) => {
  window.addEventListener('resize', input);
};

export const wathcResize = () => {
  window.addEventListener('resize', documentHeight);
};

export const timestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.getDate();
};

export const timestampToDayAndMonth = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth();
  const arr = [];
  arr.push(day, month);
  return arr;
};

export const dateToDayAndMonth = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const arr = [];
  arr.push(day, month);
  return arr;
};

export const timestampToHoursAndMinutes = (input) => {
  const date = new Date(input);
  return `${date.getHours()} : ${date.getMinutes()}`;
};

export const dateToTimestampZeroHours = (input) => {
  const dateZeroHours = input.setHours(0, 0, 0, 0);
  return dateZeroHours;
};

export const minutesToTimestamp = (minutes, date) => {
  const currentDate = date.setHours(0, 0, 0, 0);
  const timestamp = currentDate + minutes * 60000;
  return timestamp;
};

export const getAllDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const dates = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const checkIfProgramari = (programari, date) => {
  const dateDayAndMonth = dateToDayAndMonth(date);
  for (let i = 0; i < programari.length; i++) {
    const calendarDayAndMonth = timestampToDayAndMonth(
      programari[i].timeSlotStart
    );
    if (
      (dateDayAndMonth[0] === calendarDayAndMonth[0]) &
      (dateDayAndMonth[1] === calendarDayAndMonth[1])
    ) {
      return true;
    }
  }
};

export const checkIfCalendar = (calendar, date) => {
  const dateDayAndMonth = dateToDayAndMonth(date);
  for (let i = 0; i < calendar.length; i++) {
    const calendarDayAndMonth = timestampToDayAndMonth(
      calendar[i].timeSlotStart
    );
    if (
      (dateDayAndMonth[0] === calendarDayAndMonth[0]) &
      (dateDayAndMonth[1] === calendarDayAndMonth[1])
    ) {
      return true;
    }
  }
};

export const checkIfPastDate = (sedinta) => {
  const currentDate = new Date().getTime();
  if (currentDate > sedinta.timeSlotStart) {
    return false;
  } else {
    return true;
  }
};

export const processData = (data, navlink) => {
  const dataP = []   
  if (data && data.length && navlink) {
    if (navlink === "terapeuti") {
      data.forEach((el) => {
        const objTerapeuti = {
          id: el.id,
          nume: el.nume,
          prenume: el.prenume,
          telefon: el.telefon,
          specializare: el.specializare,
        };
        dataP.push(objTerapeuti);
      });
    } else if (navlink === "comenzi") {
      data.forEach((el) => {
        const objComenzi = {
          id: el.id,
          data: el.data,
          numar: el.numar,
          nume: el.nume,
          prenume: el.prenume,
          telefon: el.telefon,
          serviciu: el.serviciu,
        };
        dataP.push(objComenzi);
      });
    } else if (navlink === "zone") {
      data.forEach((el) => {
        const objZone = {
          id: el.a_id,
          denumire: el.a_name,
          tarif: el.a_extra_charge,          
        };
        dataP.push(objZone);
      });
    } else if (navlink === "specializari") {
      data.forEach((el) => {
        const objZone = {
          id: el.mt_id,
          denumire: el.mt_name,          
        };
        dataP.push(objZone);
      });
    } else if (navlink === "servicii") {
      data.forEach((el) => {
        const objZone = {
          id: el.s_id,
          denumire: el.service_name,
          specializare: el.m_type_id,          
        };
        dataP.push(objZone);
      });
    } else {
      data.forEach((el) => {
        dataP.push(el);
      });
    }
  }  
  return dataP
}