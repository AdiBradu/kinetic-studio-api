import { gql } from "@apollo/client";


export const GET_ALL_USERS= gql`
query{
  getAllUsers {
    u_id
    first_name
    last_name
    email
    phone
    created
    updated
  }
}
`;

export const GET_USER= gql`
query GetUser($id: Float!){
  getUser(id: $id) {
    u_id
    first_name
    last_name
    email
    phone
    profile_picture_url
    created
    updated
  }
}
`;

export const MY_DATA= gql`
query{
  me {
    u_id
    u_type
    first_name
    last_name
    email
    phone
    profile_picture_url
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
    mt_name
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
    m_types
    description
    created
    updated
  }
}
`;

export const GET_PARTNER_CURRENT_SCHEDULE= gql`
query GetPartnerCurrentSchedule($id: Float){
  getPartnerCurrentSchedule(id: $id) {
    schedule_start
    schedule_end
  }
}
`;

export const GET_PARTNER_FILLED_TIME_SLOTS= gql`
query GetPartnerFilledTimeSlots($id: Float){
  getPartnerFilledTimeSlots(id: $id) {
    schedule_start
    schedule_end
  }
}
`;

export const GET_ALL_ORDER_DETAILS = gql`
query GetAllOrderDetails($id: Float!) {
  getAllOrderDetails(id: $id) {
    od_id
    order_id
    partner_id
    partnerName
    appointment_start
    appointment_end
    appointment_order
    created
    updated
  }
}
`;

export const GET_ALL_ORDERS= gql`
query GetAllOrders($offset: Int, $limit: Int){
  getAllOrders(offset: $offset, limit: $limit) {
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
    service_name
    order_subtotal
    order_total
    totalCount
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
