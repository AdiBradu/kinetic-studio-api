import React from "react";
import "./ButtonAdd.component.scss";

export default function ButtonAdd() {
  return (
    <button className="btn-admin-add">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 3.25C6.27208 3.25 3.25 6.27208 3.25 10C3.25 13.7279 6.27208 16.75 10 16.75C13.7279 16.75 16.75 13.7279 16.75 10C16.75 6.27208 13.7279 3.25 10 3.25ZM0.75 10C0.75 4.89137 4.89137 0.75 10 0.75C15.1086 0.75 19.25 4.89137 19.25 10C19.25 15.1086 15.1086 19.25 10 19.25C4.89137 19.25 0.75 15.1086 0.75 10Z"
          fill="#EEEEEE"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 5.05777C10.6904 5.05777 11.25 5.61741 11.25 6.30777V13.6924C11.25 14.3827 10.6904 14.9424 10 14.9424C9.30969 14.9424 8.75005 14.3827 8.75005 13.6924V6.30777C8.75005 5.61741 9.30969 5.05777 10 5.05777Z"
          fill="#EEEEEE"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.05777 9.99987C5.05777 9.30952 5.61741 8.74987 6.30777 8.74987H13.6924C14.3827 8.74987 14.9424 9.30952 14.9424 9.99987C14.9424 10.6902 14.3827 11.2499 13.6924 11.2499H6.30777C5.61741 11.2499 5.05777 10.6902 5.05777 9.99987Z"
          fill="#EEEEEE"
        />
      </svg>
      <p>adauga</p>
    </button>
  );
}
