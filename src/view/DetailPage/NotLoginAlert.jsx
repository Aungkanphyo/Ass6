// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function NotLoginAlert() {
  const { setLoginAlert } = useAuth();
  // close the login alert box
  const handleAlertBox = () => {
    setLoginAlert(false);
  };
  return (
    <div
      className="m-auto absolute left-[5rem] top-[10rem] sm:left-[9rem] sm:top-[10rem] md:top-[16rem] md:left-[11rem] z-10 justify-center w-[400px] items-center mt-2 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-400 dark:bg-gray-800 dark:text-yellow-300"
      role="alert"
    >
      <div className="flex">
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">
            You aren't login. Firstly login your account.
            <Link
              className="ms-2 text-blue-600 underline decoration-1"
              to="/login"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={handleAlertBox}
          className="bg-red-500 mt-3 p-2 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default NotLoginAlert;
