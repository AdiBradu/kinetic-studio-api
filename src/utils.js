export const checkIfActiveElement = (e) => {
  if (document.activeElement === e.current) {
    e.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const getElementHeight = (input) => {
  const element = document.getElementById(input);
  const offsetHeight = element.offsetHeight;
  return offsetHeight;
};

export const setElementHeight = (input, name, height) => {
  const element = document.getElementById(input);
  element.style.setProperty(name, `${height}px`);
};

export const setDashboardHeight = () => {
  /* const navbar = document.getElementById('navbar');
  const navbarHeight = navbar.offsetHeight;
  const dashboard = document.getElementById('dashboard');
  dashboard.style.setProperty(
    '--dashboard-height',
    `${window.innerHeight - navbarHeight}px`,
  );
  dashboard.style.setProperty(
    '--dashboard-login-padding-bottom',
    `${navbarHeight}px`,
  ); */
};

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
      programari[i].timeSlotStart,
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
      calendar[i].timeSlotStart,
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
  if (currentDate > sedinta.timeSlotStart && sedinta.timeSlotStart > 0) {
    return false;
  } else {
    return true;
  }
};

export const toCapitalCase = (word) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const processData = (data, navlink) => {
  console.log(data);
  const dataP = [];
  if (data && data.length && navlink) {
    if (navlink === 'terapeuti') {
      data.forEach((el) => {
        const objTerapeuti = {
          id: el.p_id,
          nume: toCapitalCase(el.last_name),
          prenume: toCapitalCase(el.first_name),
          telefon: el.phone,
          email: el.email.toLowerCase(),
          specializari: toCapitalCase(el.m_types),
        };
        dataP.push(objTerapeuti);
      });
    } else if (navlink === 'comenzi') {
      data.forEach((el) => {
        const objComenzi = {
          id: el.o_id,
          data: new Date(el.created).toLocaleDateString(),
          nume: toCapitalCase(el.customer_last_name),
          prenume: toCapitalCase(el.customer_first_name),
          telefon: el.customer_phone,
          email: el.customer_email,
          judet: toCapitalCase(el.customer_region),
          localitate: toCapitalCase(el.customer_city),
          strada: toCapitalCase(el.customer_street),
          nr: el.customer_street_number.toUpperCase(),
          // serviciu: el.service_name,
          // idServiciu: el.service_id,
        };
        dataP.push(objComenzi);
      });
    } else if (navlink === 'zone') {
      data.forEach((el) => {
        const objZone = {
          id: el.a_id,
          denumire: toCapitalCase(el.a_name),
          tarif: el.a_extra_charge,
        };
        dataP.push(objZone);
      });
    } else if (navlink === 'specializari') {
      data.forEach((el) => {
        const objZone = {
          id: el.mt_id,
          denumire: toCapitalCase(el.mt_name),
        };
        dataP.push(objZone);
      });
    } else if (navlink === 'servicii') {
      data.forEach((el) => {
        const objZone = {
          id: el.s_id,
          denumire: toCapitalCase(el.service_name),
          specializare: toCapitalCase(el.mt_name),
          sedinte: el.appointments_number,
          durata: el.appointment_duration,
          tarif: el.service_cost,
        };
        dataP.push(objZone);
      });
    } else if (navlink === 'admin') {
      data.forEach((el) => {
        const objZone = {
          id: el.u_id,
          nume: toCapitalCase(el.last_name),
          prenume: toCapitalCase(el.first_name),
          telefon: el.phone,
          email: el.email,
        };
        dataP.push(objZone);
      });
    } else {
      data.forEach((el) => {
        dataP.push(el);
      });
    }
  }
  return dataP;
};

export const processMTypes = (data) => {
  const dataP = [];
  if (data && data.length) {
    data.forEach((el) => {
      const objZone = {
        id: el.mt_id,
        denumire: el.mt_name,
      };
      dataP.push(objZone);
    });
  }
  return dataP;
};

export const processServices = (data) => {
  const dataP = [];
  if (data && data.length) {
    data.forEach((el) => {
      const objZone = {
        id: el.s_id,
        denumire: el.service_name,
        specializare: el.mt_name,
        sedinte: el.appointments_number,
        durata: el.appointment_duration,
        tarif: el.service_cost,
      };
      dataP.push(objZone);
    });
  }
  return dataP;
};

export const processPartners = (data) => {
  const dataP = [];
  if (data && data.length) {
    data.forEach((el) => {
      const objTerapeuti = {
        id: el.p_id,
        nume: el.last_name,
        prenume: el.first_name,
        telefon: el.phone,
      };
      dataP.push(objTerapeuti);
    });
  }
  return dataP;
};

export const processFilterPartners = (data) => {
  const dataP = [];
  if (data && data.length) {
    data.forEach((el) => {
      const objTerapeuti = {
        id: el.p_id,
        nume: el.last_name,
        prenume: el.first_name,
        telefon: el.phone,
        specializare: el.m_types ? el.m_types.split(',') : [],
      };
      dataP.push(objTerapeuti);
    });
  }
  return dataP;
};

export const processPartnerSched = (data) => {
  const dataP = [];
  if (data && data.length) {
    data.forEach((el) => {
      const objTerapeutiSched = {
        timeSlotStart: el.schedule_start,
        timeSlotEnd: el.schedule_end,
      };
      dataP.push(objTerapeutiSched);
    });
  }
  return dataP;
};

export const processUser = (data) => {
  const dataP = [];
  if (data) {
    const objUser = {
      id: data.u_id,
      nume: data.last_name !== null ? data.last_name : '',
      prenume: data.first_name !== null ? data.first_name : '',
      telefon: data.phone !== null ? data.phone : '',
      email: data.email,
      profile_picture_url: data.profile_picture_url,
      parola: '',
      confirma: '',
    };
    dataP.push(objUser);
  }
  return dataP;
};

export const processEmails = (data) => {
  let dataP = {
    id1: parseFloat(0),
    id2: parseFloat(0),
    subiect1: '',
    emailBody1: '',
    subiect2: '',
    emailBody2: '',
  };
  if (data && data.length) {
    dataP = {
      id1: data[0]?.e_id ? parseFloat(data[0]?.e_id) : parseFloat(0),
      id2: data[1]?.e_id ? parseFloat(data[1]?.e_id) : parseFloat(0),
      subiect1: data[0]?.email_subject ? data[0]?.email_subject : '',
      emailBody1: data[0]?.email_body ? data[0]?.email_body : '',
      subiect2: data[1]?.email_subject ? data[1]?.email_subject : '',
      emailBody2: data[1]?.email_body ? data[1]?.email_body : '',
    };
  }
  return dataP;
};

export const processOdets = (data) => {
  const dataP = [];
  if (data && data.length) {
    data.forEach((el) => {
      const objODets = {
        sedinta: el.appointment_order,
        terapeut: el.partner_id,
        numeTerapeut: el.partnerName,
        timeSlotStart: el.appointment_start,
        timeSlotEnd: el.appointment_end,
      };
      dataP.push(objODets);
    });
  }
  return dataP;
};

export const processMultiMTypes = (data) => {
  const dataP = [];
  if (data && data.length) {
    data.forEach((el) => {
      const objM = {
        value: el.mt_name,
        label: el.mt_name,
      };
      dataP.push(objM);
    });
  }
  return dataP;
};
