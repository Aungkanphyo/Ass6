// eslint-disable-next-line no-unused-vars
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ConfirmDelete() {
  const { postId } = useParams();
  const { setDeleteConfirm } = useAuth();
  const navigator = useNavigate();
  const handleCancel = () => {
    setDeleteConfirm(false);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3030/posts/${postId}`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    navigator("/");
  };
  return (
    <div className="w-[400px] text-black shadow-lg bg-gray-300 absolute top-48 left-40 p-8 text-center">
      <p className="font-semibold text-lg font-serif mb-6">
        Are you sure to delete this post?
      </p>
      <button
        onClick={handleCancel}
        className="bg-green-400 p-3 cursor-pointer me-2 rounded-lg text-white"
      >
        Cancel
      </button>
      <button
        onClick={handleDelete}
        className="bg-blue-500 p-3 cursor-pointer rounded-lg text-white"
      >
        Confirm
      </button>
    </div>
  );
}

export default ConfirmDelete;
