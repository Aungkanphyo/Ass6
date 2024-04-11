import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import CreatePost from "../PostCreate/CreatePost";
import { useAuth } from "../../context/AuthContext";
import EditProfile from "./EditProfile";

function ProfilePage() {
  const user = localStorage.getItem("local_storage_user_data");
  const {
    createBox,
    setCreateBox,
    editBox,
    setEditBox,
    userInfo,
    setUserInfo,
  } = useAuth();
  useEffect(() => {
    axios
      .get(`http://localhost:3030/users?email=${user}`)
      .then((res) => {
        setUserInfo(res.data[0]);
      })
      .catch((error) => console.log(error));
  });

  const handleCreateBox = () => {
    setCreateBox(true);
  };

  const handleEditBox = () => {
    setEditBox(true);
  };

  return (
    <div>
      <div
        className={`${editBox ? "blur" : ""} ${
          createBox ? "blur" : ""
        } w-[400px] bg-black relative h-min-[300px] shadow-xl text-white m-auto mt-20 rounded-2xl`}
      >
        <button
          onClick={handleEditBox}
          className="bg-green-600 absolute p-2 right-0"
        >
          Edit profile
        </button>
        <div className="text-center p-10">
          <img
            className="w-40 h-40 rounded-full m-auto object-cover"
            src={userInfo?.profile_url}
            alt=""
          />
          <div className="my-5 text-2xl font-medium">{userInfo?.name}</div>
          <button
            onClick={handleCreateBox}
            className="bg-green-600 p-3 rounded-xl text-center"
          >
            Create new post
          </button>
        </div>
      </div>
      {createBox ? <CreatePost /> : null}
      {editBox ? <EditProfile /> : null}
    </div>
  );
}

export default ProfilePage;
