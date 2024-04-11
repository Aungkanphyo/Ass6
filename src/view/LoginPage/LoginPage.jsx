// eslint-disable-next-line no-unused-vars
import { FlagIcon } from "@heroicons/react/24/solid";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";

function LoginPage() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loginFailAlert, setLoginFailAlert] = useState();
  const navigator = useNavigate();

  //handlAlert is showing the error message if user input wrong credentials
  const handleAlert = () => {
    setLoginFailAlert(false);
  };

  const handleSubmit = () => {
    axios
      .get(`http://localhost:3030/users?email=${inputEmail}`)
      .then((res) => {
        //in JSON server if have data in the users array this condition is working
        if (res.data.length > 0) {
          const { phone, confirm } = res.data[0];
          if (phone === inputPhone && confirm === inputPassword) {
            localStorage.setItem("local_storage_user_data", inputEmail);
            navigator("/profile");
            window.location.reload();
          } else {
            navigator("/login");
          }
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="bg-black text-white w-[500px] p-10 m-auto mb-10 mt-10 rounded-lg">
        {loginFailAlert && (
          <div
            className="p-1 text-center mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <div className="text-end me-3">
              <button
                onClick={handleAlert}
                type="button"
                className="text-black"
              >
                x
              </button>
            </div>
            <span className="font-medium pb-3">
              Incorrect user info or not register.
            </span>
          </div>
        )}
        <div className="m-auto">
          <h1 className="text-center mb-7 font-bold text-[30px]">Login Page</h1>
          <div className="w-[250px] m-auto">
            <div className="mb-5">
              <div>
                <label htmlFor="email" className="text-[18px]">
                  Enter your email
                </label>
              </div>
              <input
                className="p-1 rounded-lg text-black"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="mb-5">
              <div>
                <label htmlFor="phone">Enter your phone number</label>
              </div>
              <input
                className="p-1 rounded-lg text-black"
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
                type="number"
                name="phone"
                id="phone"
                required
              />
            </div>
            <div className="mb-5">
              <div>
                <label htmlFor="password">Enter your password</label>
              </div>
              <input
                className="p-1 rounded-lg text-black"
                id="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                type="password"
                name="password"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-400 mb-6 px-3 text-lg rounded-lg ms-44"
            >
              Login
            </button>
          </div>
        </div>
        <div className="text-center text-sm">
          If you don't have account. Please{" "}
          <Link
            className="text-blue-400 underline underline-offset-2 "
            to="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
