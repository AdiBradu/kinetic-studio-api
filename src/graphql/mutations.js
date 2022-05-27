import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!){ 
    login(email: $email, password: $password) {
      u_id
      u_type
      first_name
      last_name
      email
      phone
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout{ 
    logout {
      successful
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $firstName: String!, $lastName: String!, $email: String!, $phone: String!, $oldPassword: String, $newPassword: String){ 
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, oldPassword: $oldPassword, newPassword: $newPassword) {
      successful
      message
    }
  }
`;

export const CREATE_AREA = gql`
  mutation CreateArea($name: String!, $extra_charge: Float!){ 
    createArea(name: $name, extra_charge: $extra_charge) {
      successful
      message    
    }
  }
`;

export const UPDATE_AREA = gql`
  mutation UpdateArea($id: ID!, $name: String!, $extra_charge: Float!){ 
    updateArea(id: $id, name: $name, extra_charge: $extra_charge) {
      successful
      message  
    }
  }
`;

export const DELETE_AREA = gql`
  mutation DeleteArea($id: ID!){ 
    deleteArea(id: $id) {
      successful
      message  
    }
  }
`;

export const CREATE_M_TYPE = gql`
  mutation CreateMType($name: String!){ 
    createMType(name: $name) {
      successful
      message    
    }
  }
`;

export const UPDATE_M_TYPE = gql`
  mutation UpdateMType($id: ID!, $name: String!){ 
    updateMType(id: $id, name: $name) {
      successful
      message  
    }
  }
`;

export const DELETE_M_TYPE = gql`
  mutation DeleteMType($id: ID!){ 
    deleteMType(id: $id) {
      successful
      message  
    }
  }
`;

export const CREATE_SERVICE = gql`
  mutation CreateService($service_name: String!, $type: Float!, $appointments_number: Int!, $appointment_duration: Int!, $service_cost: Float!){ 
    createService(service_name: $service_name, type: $type, appointments_number: $appointments_number, appointment_duration: $appointment_duration, service_cost: $service_cost) {
      successful
      message    
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService($id: ID!, $service_name: String!, $type: Float!, $appointments_number: Int!, $appointment_duration: Int!, $service_cost: Float!){ 
    updateService(id: $id, service_name: $service_name, type: $type, appointments_number: $appointments_number, appointment_duration: $appointment_duration, service_cost: $service_cost) {
      successful
      message    
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!){ 
    deleteService(id: $id) {
      successful
      message    
    }
  }
`;

export const CREATE_EMAIL = gql`
  mutation CreateEmail($email_subject: String!, $email_body: String!){ 
    createEmail(email_subject: $email_subject, email_body: $email_body) {
      successful
      message    
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation UpdateEmail($email_subject: String!, $email_body: String!){ 
    updateEmail(id: $id, email_subject: $email_subject, email_body: $email_body) {
      successful
      message    
    }
  }
`;

export const DELETE_EMAIL = gql`
  mutation DeleteEmail($id: ID!){ 
    deleteEmail(id: $id) {
      successful
      message    
    }
  }
`;

export const CREATE_PARTNER_SCHEDULE = gql`
  mutation CreatePartnerSchedule($id: ID!, $startTime: Float!, $endTime: Float!){ 
    createPartnerSchedule(id: $id, startTime: $startTime, endTime: $endTime) {
      successful
      message    
    }
  }
`;

export const UPDATE_PARTNER_SCHEDULE = gql`
  mutation UpdatePartnerSchedule($id: ID!, $startTime: Float!, $endTime: Float!){ 
    updatePartnerSchedule(id: $id, startTime: $startTime, endTime: $endTime) {
      successful
      message    
    }
  }
`;

export const DELETE_PARTNER_SCHEDULE = gql`
  mutation DeletePartnerSchedule($id: ID!){ 
    deletePartnerSchedule(id: $id) {
      successful
      message    
    }
  }
`;

export const CREATE_PARTNER = gql`
  mutation CreatePartner($firstName: String!, $lastName: String!, $phone: String!, $email: String!, $profilePictureUrl: String, $description: String){ 
    createPartner(firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, profilePictureUrl: $profilePictureUrl, description: $description) {
      successful
      message    
    }
  }
`;

export const UPDATE_PARTNER = gql`
  mutation UpdatePartner($id: ID!, $firstName: String!, $lastName: String!, $phone: String!, $email: String!, $profilePictureUrl: String, $description: String){ 
    updatePartner(id: $id, firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, profilePictureUrl: $profilePictureUrl, description: $description) {
      successful
      message    
    }
  }
`;

export const DELETE_PARTNER = gql`
  mutation DeletePartner($id: ID!){ 
    deletePartner(id: $id) {
      successful
      message    
    }
  }
`;

export const CREATE_ORDER_DETAIL = gql`
  mutation CreateOrderDetail($orderId: Float!, $partnerId: Float!, $startTime: Float!, $endTime: Float!, $scheduleOrder: Int!){ 
    createOrderDetail(orderId: $orderId, partnerId: $partnerId, startTime: $startTime, endTime: $endTime, scheduleOrder: $scheduleOrder) {
      successful
      message    
    }
  }
`;

export const UPDATE_ORDER_DETAIL = gql`
  mutation UpdateOrderDetail($id: ID!, $orderId: Float!, $partnerId: Float!, $startTime: Float!, $endTime: Float!, $scheduleOrder: Int!){ 
    updateOrderDetail(id: $id, orderId: $orderId, partnerId: $partnerId, startTime: $startTime, endTime: $endTime, scheduleOrder: $scheduleOrder) {
      successful
      message    
    }
  }
`;

export const DELETE_ORDER_DETAIL = gql`
  mutation DeleteOrderDetail($id: ID!){ 
    deleteOrderDetail(id: $id) {
      successful
      message    
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($firstName: String!, $lastName: String!, $phone: String!, $email: String!, $region: String!, $city: String!, $street: String!, $streetNumber: String!, $serviceId: Float!, $subtotal: Float!, $total: Float! ){ 
    createOrder(firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, region: $region, city: $city, street: $street, streetNumber: $streetNumber, serviceId: $serviceId, subtotal: $subtotal, total: $total) {
      successful
      message    
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $firstName: String!, $lastName: String!, $phone: String!, $email: String!, $region: String!, $city: String!, $street: String!, $streetNumber: String!, $serviceId: Float!, $subtotal: Float!, $total: Float!){ 
    updateOrder(id: $id, firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, region: $region, city: $city, street: $street, streetNumber: $streetNumber, serviceId: $serviceId, subtotal: $subtotal, total: $total) {
      successful
      message    
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!){ 
    deleteOrder(id: $id) {
      successful
      message    
    }
  }
`;


