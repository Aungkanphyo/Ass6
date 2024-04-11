// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isUser, setIsUser] = useState();
  useEffect(() => {
    const user = localStorage.getItem("local_storage_user_data");
    setIsUser(user);
  });
  const handleLogout = () => {
    window.location.reload();
    localStorage.removeItem("local_storage_user_data");
  };
  return (
    <nav className="bg-black text-white z-30 p-6 flex justify-between sticky top-0">
      <div className="font-black text-xl">Assignment 6</div>
      <div className="mx-3">
        <NavLink className="mx-6 text-xl" to="/">
          Home
        </NavLink>
        <NavLink className="mx-6 text-xl" to="/profile">
          Profile
        </NavLink>
        {isUser ? (
          <button className="text-xl mx-6" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <NavLink className="mx-6 text-xl" to="/login">
              Login
            </NavLink>
            <NavLink className="mx-6 text-xl" to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
