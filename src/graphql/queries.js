import { gql } from "@apollo/client";

export const MY_DATA= gql`
query{
  me {
    u_id
    u_type
    first_name
    last_name
    email
    phone
  }
}
`;

export const GET_ALL_M_TYPES= gql`
query{
  getAllMTypes {
    mt_id
    mt_name
    created
    updated
  }
}
`;

export const GET_ALL_AREAS= gql`
query{
  getAllAreas {
    a_id
    a_name
    a_extra_charge
    created
    updated
  }
}
`;

export const GET_ALL_SERVICES= gql`
query{
  getAllServices {
    s_id
    service_name
    m_type_id
    appointments_number
    appointment_duration
    service_cost
    created
    updated
  }
}
`;

export const GET_ALL_PARTNERS= gql`
query{
  getAllPartners {
    p_id
    first_name
    last_name
    phone
    email
    profile_picture_url
    description
    created
    updated
  }
}
`;

export const GET_ALL_ORDERS= gql`
query{
  getAllOrders {
    o_id
    customer_first_name
    customer_last_name
    customer_phone
    customer_email
    customer_region
    customer_city
    customer_street
    customer_street_number
    service_id
    order_subtotal
    order_total
    created
    updated
  }
}
`;

export const GET_ALL_EMAILS= gql`
query{
  getAllEmails {
    e_id
    email_subject
    email_body
    created
    updated
  }
}
`;
