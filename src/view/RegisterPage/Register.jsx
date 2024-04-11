// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigator = useNavigate();
  const { userData, setUserData } = useAuth();
  // console.log(userData);
  const [password, setPassword] = useState("");
  // errorMessage is check the password is same the password format or not
  const [errorMessage, setErrorMessage] = useState("");
  // confirmError is only for the error alert message if the password and confirm password is not equal
  const [confirmError, setConfrimError] = useState("");
  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    // setUserData(value);
    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const isValid = passwordRegex.test(value);
    setErrorMessage(
      isValid ? "" : "Invalid input. Please enter the valid input."
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = password.includes(userData.confirm);
    if (valid) {
      axios
        .post("http://localhost:3030/users", userData)
        .then((res) => {
          console.log(res);
          setUserData(res);
        })
        .catch((error) => console.log(error));

      setConfrimError("");
      navigator("/login");
    } else {
      setConfrimError("Password are not match. Please try again.");
      console.log("Error is working.");
    }
  };
  return (
    <div className="bg-black text-white w-[500px] p-10 m-auto mb-10 mt-10 rounded-lg">
      <form onSubmit={handleSubmit} className="m-auto">
        <h1 className="text-center mb-7 font-bold text-[30px]">
          Register Page
        </h1>
        <div className="w-[250px] m-auto">
          <div className="mb-5">
            <div>
              <label htmlFor="profile" className="text-[18px]">
                Enter profile url
              </label>
            </div>
            <input
              onChange={(e) =>
                setUserData({ ...userData, profile_url: e.target.value })
              }
              className="p-1 rounded-lg text-black"
              type="text"
              name="profile_url"
              id="profile"
            />
          </div>
          <div className="mb-5">
            <div>
              <label htmlFor="name">Enter name</label>
            </div>
            <input
              className="p-1 rounded-lg text-black"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              id="name"
              type="text"
              name="name"
            />
          </div>
          <div className="mb-5">
            <div>
              <label htmlFor="email">Enter email</label>
            </div>
            <input
              className="p-1 rounded-lg text-black"
              id="email"
              type="email"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              name="email"
            />
          </div>
          <div className="mb-5">
            <div>
              <label htmlFor="phone">Enter phone number</label>
            </div>
            <input
              className="p-1 rounded-lg text-black"
              type="number"
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              name="phone"
              id="phone"
            />
          </div>
          <div className="mb-5">
            <div>
              <label htmlFor="password">Enter password</label>
            </div>
            <input
              className="p-1 rounded-lg text-black"
              type="password"
              value={password}
              onChange={handlePassword}
              name="password"
              id="password"
            />
            <div className="text-red-500">{errorMessage}</div>
          </div>
          <div>
            <div>
              <label htmlFor="confirm">Enter confirm password</label>
            </div>
            <input
              className="p-1 rounded-lg text-black"
              type="password"
              onChange={(e) =>
                setUserData({ ...userData, confirm: e.target.value })
              }
              name="confirm"
              id="confirm"
            />
            <div className="text-red-500">{confirmError}</div>
          </div>
          <button
            className="bg-green-500 mt-6 py-2 px-5 text-lg rounded-lg ms-36"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
