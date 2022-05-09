import React from "react";
import "./ViewIcon.component.scss";

export default function ViewIcon({ color, bgColor, data }) {
  return (
    <button className="button-view" style={{ backgroundColor: bgColor }}>
      <svg
        className="icon-view"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.95287 11.431C1.81293 11.588 1.73553 11.791 1.73553 12.0014C1.73553 12.2118 1.81293 12.4148 1.95287 12.5718C2.82579 13.5106 4.24291 14.8792 6.00431 16.0092C7.77348 17.1442 9.83192 18.0014 12 18.0014C14.1682 18.0014 16.2266 17.1442 17.9958 16.0092C19.7572 14.8792 21.1743 13.5106 22.0472 12.5718C22.1872 12.4148 22.2646 12.2118 22.2646 12.0014C22.2646 11.791 22.1872 11.588 22.0472 11.431C21.1743 10.4922 19.7572 9.12355 17.9958 7.99355C16.2266 6.85858 14.1682 6.0014 12 6.0014C9.83192 6.0014 7.77348 6.85858 6.00431 7.99355C4.24291 9.12355 2.82579 10.4922 1.95287 11.431ZM5.07865 6.55066C7.00377 5.31564 9.38532 4.28711 12 4.28711C14.6148 4.28711 16.9963 5.31564 18.9215 6.55066C20.851 7.78855 22.3805 9.27121 23.308 10.2694L23.3164 10.2785C23.7429 10.751 23.9789 11.3649 23.9789 12.0014C23.9789 12.6379 23.7428 13.2517 23.3164 13.7243L23.308 13.7335C22.3805 14.7316 20.851 16.2142 18.9215 17.4521C16.9963 18.6871 14.6148 19.7157 12 19.7157C9.38532 19.7157 7.00377 18.6871 5.07865 17.4521C3.14907 16.2142 1.61963 14.7316 0.692139 13.7334L0.683673 13.7243C0.257228 13.2518 0.0212402 12.6379 0.0212402 12.0014C0.0212402 11.3649 0.257295 10.751 0.68374 10.2785L0.692073 10.2693C1.61956 9.27115 3.14907 7.78855 5.07865 6.55066Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 9.42997C10.5799 9.42997 9.42862 10.5812 9.42862 12.0014C9.42862 13.4216 10.5799 14.5728 12 14.5728C13.4202 14.5728 14.5715 13.4216 14.5715 12.0014C14.5715 10.5812 13.4202 9.42997 12 9.42997ZM7.71434 12.0014C7.71434 9.63446 9.63311 7.71568 12 7.71568C14.367 7.71568 16.2858 9.63446 16.2858 12.0014C16.2858 14.3683 14.367 16.2871 12 16.2871C9.63311 16.2871 7.71434 14.3683 7.71434 12.0014Z"
          fill={color}
        />
      </svg>
    </button>
  );
}
