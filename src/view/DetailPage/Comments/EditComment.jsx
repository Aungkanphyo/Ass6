// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function editComment() {
  const { postId } = useParams();
  // setCommentEdit is only for close the edit box. Use this in the handleClose method
  const { setCommentEdit, commentId, userInfo } = useAuth();

  // to show the current comment text
  const [currentComment, setCurrentComment] = useState([]);

  const [editComment, setEditComment] = useState({
    text: "",
    postId: 0,
    userId: 0,
    id: 0,
  });

  useEffect(() => {
    // get the current comment text from the JSON server
    axios
      .get(`http://localhost:3030/comments/${commentId}`)
      .then((res) => setCurrentComment(res.data))
      .catch((error) => console.log(error));
  });
  // for handle the edit box close
  const handleClose = () => {
    setCommentEdit(false);
  };

  // handle for the edit comment text
  const handleCommentEdit = (e) => {
    setEditComment({
      text: e.target.value,
      postId: Number(postId),
      userId: userInfo.id,
      id: commentId,
    });
    setCurrentComment(editComment);
  };

  // handle for the edit button for put the edit text to JSON server
  const handleSubmit = () => {
    axios
      .put(
        `http://localhost:3030/comments/${currentComment.id}`,
        currentComment
      )
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-black text-white w-[300px] m-auto rounded-md fixed bottom-[40%] left-[40%]">
      <div>
        <div className="flex justify-end me-6">
          <button
            onClick={handleClose}
            className="text-end mt-3 cursor-pointer"
          >
            x
          </button>
        </div>
        <h1 className="text-center">Edit comment</h1>
        <div className="p-2 flex justify-center">
          <input
            className="m-auto text-black"
            type="text"
            name="text"
            value={currentComment.text}
            onChange={handleCommentEdit}
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-400 py-1 px-10 rounded-md mb-5"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default editComment;
