// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function EditProfile() {
  const { setEditBox,userInfo } = useAuth();
  const [userData, setUserData] = useState({
    profile_url: "",
    name: "",
  });

  const handleXButton = () => {
    setEditBox(false);
  };

  const handleInput = (e)=>{
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  const handleEdit = () => {
    axios
      .put(`http://localhost:3030/users/${userInfo.id}`, userData)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-black rounded-xl w-[300px] absolute right-[10rem] top-20">
      <div className="relative mb-3">
        <button
          onClick={handleXButton}
          className="text-white absolute right-4 top-2"
        >
          x
        </button>
      </div>
      <div className="text-white p-5">
        <h1 className="text-center font-serif text-xl mb-3">Edit Profile</h1>
        <div className="ms-3">
          <div>
            <label htmlFor="profile">Profile url</label>
          </div>
          <input
            className="rounded-lg p-1 mb-2 text-black"
            value={userData.profile_url}
            onChange={handleInput}
            type="text"
            name="profile_url"
            id="profile"
          />
          <div>
            <label htmlFor="name">Enter Name</label>
          </div>
          <input
            className="rounded-lg p-1 mb-5 text-black"
            value={userData.name}
            onChange={handleInput}
            type="text"
            name="name"
            id="name"
          />
          <div className="text-end">
            <button
              onClick={handleEdit}
              className="bg-green-500 rounded-lg p-1 w-[100px]"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
