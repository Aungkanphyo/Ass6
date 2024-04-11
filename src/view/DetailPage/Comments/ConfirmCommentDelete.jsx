// eslint-disable-next-line no-unused-vars
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

function ConfirmCommentDelete() {
  const { commentId, setCommentDeleteOption } = useAuth();

  const handleCancel = () => {
    setCommentDeleteOption(false);
  };

  const handleDelete = () => {
    setCommentDeleteOption(false);
    axios.delete(`http://localhost:3030/comments/${commentId}`);
  };
  return (
    <div className="bg-gray-400 text-white p-5 w-[400px] rounded-md m-auto text-center fixed bottom-[50%] left-[15%] sm:bottom-[50%] sm:left-[20%] md:bottom-[50%] md:left-[25%] lg:bottom-[50%] lg:left-[30%] xl:left-[35%] 2xl:left-[40%]">
      <div>Are you sure you want to delete this comment?</div>
      <div className="mt-3">
        <button
          onClick={handleCancel}
          className="bg-green-400 p-1 rounded-md me-2"
        >
          Cancel
        </button>
        <button onClick={handleDelete} className="bg-blue-500 p-1 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmCommentDelete;
