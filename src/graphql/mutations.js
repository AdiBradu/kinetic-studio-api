import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

export const LOGOUT = gql`
  mutation Logout {
    logout {
      successful
      message
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String
    $lastName: String
    $email: String!
    $phone: String
    $profile_picture_url: String
    $newPassword: String!
    $confirmPassword: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      profile_picture_url: $profile_picture_url
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      successful
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: Float!
    $firstName: String
    $lastName: String
    $email: String!
    $phone: String
    $profile_picture_url: String
    $newPassword: String
    $confirmPassword: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      profile_picture_url: $profile_picture_url
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      successful
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Float!) {
    deleteUser(id: $id) {
      successful
      message
    }
  }
`;

export const CREATE_AREA = gql`
  mutation CreateArea($name: String!, $extra_charge: Float!) {
    createArea(name: $name, extra_charge: $extra_charge) {
      successful
      message
    }
  }
`;

export const UPDATE_AREA = gql`
  mutation UpdateArea($id: Float!, $name: String!, $extra_charge: Float!) {
    updateArea(id: $id, name: $name, extra_charge: $extra_charge) {
      successful
      message
    }
  }
`;

export const DELETE_AREA = gql`
  mutation DeleteArea($id: Float!) {
    deleteArea(id: $id) {
      successful
      message
    }
  }
`;

export const CREATE_M_TYPE = gql`
  mutation CreateMType($name: String!) {
    createMType(name: $name) {
      successful
      message
    }
  }
`;

export const UPDATE_M_TYPE = gql`
  mutation UpdateMType($id: Float!, $name: String!) {
    updateMType(id: $id, name: $name) {
      successful
      message
    }
  }
`;

export const DELETE_M_TYPE = gql`
  mutation DeleteMType($id: Float!) {
    deleteMType(id: $id) {
      successful
      message
    }
  }
`;

export const CREATE_SERVICE = gql`
  mutation CreateService(
    $service_name: String!
    $type: Float!
    $appointments_number: Int!
    $appointment_duration: Int!
    $service_cost: Float!
    $profile_picture_url: String!
  ) {
    createService(
      service_name: $service_name
      type: $type
      appointments_number: $appointments_number
      appointment_duration: $appointment_duration
      service_cost: $service_cost
      profile_picture_url: $profile_picture_url
    ) {
      successful
      message
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $id: Float!
    $service_name: String!
    $type: Float!
    $appointments_number: Int!
    $appointment_duration: Int!
    $service_cost: Float!
    $profile_picture_url: String!
  ) {
    updateService(
      id: $id
      service_name: $service_name
      type: $type
      appointments_number: $appointments_number
      appointment_duration: $appointment_duration
      service_cost: $service_cost
      profile_picture_url: $profile_picture_url
    ) {
      successful
      message
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: Float!) {
    deleteService(id: $id) {
      successful
      message
    }
  }
`;

export const CREATE_EMAIL = gql`
  mutation CreateEmail($email_subject: String!, $email_body: String!) {
    createEmail(email_subject: $email_subject, email_body: $email_body) {
      successful
      message
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation UpdateEmail(
    $id: ID!
    $email_subject: String!
    $email_body: String!
  ) {
    updateEmail(
      id: $id
      email_subject: $email_subject
      email_body: $email_body
    ) {
      successful
      message
    }
  }
`;

export const HANDLE_EMAILS = gql`
  mutation HandleEmails($emails: [EmailInput]!) {
    handleEmails(emails: $emails) {
      successful
      message
    }
  }
`;

export const DELETE_EMAIL = gql`
  mutation DeleteEmail($id: Float!) {
    deleteEmail(id: $id) {
      successful
      message
    }
  }
`;

export const CREATE_PARTNER_SCHEDULE = gql`
  mutation CreatePartnerSchedule(
    $id: Float!
    $startTime: Float!
    $endTime: Float!
  ) {
    createPartnerSchedule(id: $id, startTime: $startTime, endTime: $endTime) {
      successful
      message
    }
  }
`;

export const UPDATE_PARTNER_SCHEDULE = gql`
  mutation UpdatePartnerSchedule(
    $id: Float!
    $startTime: Float!
    $endTime: Float!
  ) {
    updatePartnerSchedule(id: $id, startTime: $startTime, endTime: $endTime) {
      successful
      message
    }
  }
`;

export const DELETE_PARTNER_SCHEDULE = gql`
  mutation DeletePartnerSchedule($id: Float!) {
    deletePartnerSchedule(id: $id) {
      successful
      message
    }
  }
`;

export const CREATE_PARTNER = gql`
  mutation CreatePartner(
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String!
    $profilePictureUrl: String
    $description: String
    $mTypes: String!
  ) {
    createPartner(
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      email: $email
      profilePictureUrl: $profilePictureUrl
      description: $description
      mTypes: $mTypes
    ) {
      successful
      message
    }
  }
`;

export const UPDATE_PARTNER = gql`
  mutation UpdatePartner(
    $id: Float!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String!
    $profilePictureUrl: String
    $description: String
    $mTypes: String!
  ) {
    updatePartner(
      id: $id
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      email: $email
      profilePictureUrl: $profilePictureUrl
      description: $description
      mTypes: $mTypes
    ) {
      successful
      message
    }
  }
`;

export const DELETE_PARTNER = gql`
  mutation DeletePartner($id: Float!) {
    deletePartner(id: $id) {
      successful
      message
    }
  }
`;

export const CREATE_ORDER_DETAIL = gql`
  mutation CreateOrderDetail(
    $orderId: Float!
    $partnerId: Float!
    $startTime: Float!
    $endTime: Float!
    $scheduleOrder: Int!
  ) {
    createOrderDetail(
      orderId: $orderId
      partnerId: $partnerId
      startTime: $startTime
      endTime: $endTime
      scheduleOrder: $scheduleOrder
    ) {
      successful
      message
    }
  }
`;

export const UPDATE_ORDER_DETAIL = gql`
  mutation UpdateOrderDetail(
    $orderId: Float!
    $partnerId: Float!
    $startTime: Float!
    $endTime: Float!
    $scheduleOrder: Int!
  ) {
    updateOrderDetail(
      orderId: $orderId
      partnerId: $partnerId
      startTime: $startTime
      endTime: $endTime
      scheduleOrder: $scheduleOrder
    ) {
      successful
      message
    }
  }
`;

export const DELETE_ORDER_DETAIL = gql`
  mutation DeleteOrderDetail($id: Float!) {
    deleteOrderDetail(id: $id) {
      successful
      message
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String!
    $region: String!
    $city: String!
    $street: String!
    $streetNumber: String!
    $serviceId: Float!
    $details: [OderDetailIn]
  ) {
    createOrder(
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      email: $email
      region: $region
      city: $city
      street: $street
      streetNumber: $streetNumber
      serviceId: $serviceId
      details: $details
    ) {
      successful
      message
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder(
    $id: Float!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String!
    $region: String!
    $city: String!
    $street: String!
    $streetNumber: String!
    $serviceId: Float!
  ) {
    updateOrder(
      id: $id
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      email: $email
      region: $region
      city: $city
      street: $street
      streetNumber: $streetNumber
      serviceId: $serviceId
    ) {
      successful
      message
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: Float!) {
    deleteOrder(id: $id) {
      successful
      message
    }
  }
`;
