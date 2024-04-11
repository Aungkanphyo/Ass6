// eslint-disable-next-line no-unused-vars
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import ConfirmDelete from "./Comments/ConfirmDelete";
import { useAuth } from "../../context/AuthContext";
import EditPost from "../PostEdit/EditPost";
import NotLoginAlert from "./NotLoginAlert";
import ConfirmCommentDelete from "./Comments/ConfirmCommentDelete";
import EditComment from "./Comments/EditComment";

function DetailComponent() {
  const { postId } = useParams();
  const postIdAsNumber = Number(postId);
  const {
    setComment,
    comment,
    commentUserId,
    setCommentUserId,
    deleteConfirm,
    setDeleteConfirm,
    editPost,
    setEditPost,
    loginAlert,
    setLoginAlert,
    commentDeleteOption,
    setCommentDeleteOption,
    setCommentId,
    commentEdit,
    setCommentEdit,
  } = useAuth();
  const [menu, setMenu] = useState(false);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  // this state for show the related comment menu.
  const [showCommentId, setShowCommentId] = useState("");

  // this state for comment menu
  const [commentMenu, setCommentMenu] = useState(false);

  // this state for get comment id to delete the comment
  // const [commentId, setCommentId] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3030/Posts/${postId}?_expand=user`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(
        `http://localhost:3030/comments?_expand=user&_expand=post&postId=${postId}`
      )
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => console.log(error));

    // get the current user id
    const user = localStorage.getItem("local_storage_user_data");
    axios
      .get(`http://localhost:3030/users?email=${user}`)
      .then((res) => setCommentUserId(res.data[0]))
      .catch((error) => console.log(error));

    if (commentDeleteOption) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
  });

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleDelete = () => {
    setDeleteConfirm(true);
  };

  const handleEdit = () => {
    setEditPost(true);
  };

  const handleComment = (e) => {
    setComment({
      text: e.target.value,
      postId: postIdAsNumber,
      userId: commentUserId.id,
    });
  };

  const checkLogin = () => {
    if (!localStorage.getItem("local_storage_user_data")) {
      setLoginAlert(true);
    }
  };

  const handleCommentSend = () => {
    axios
      .post(`http://localhost:3030/comments`, comment)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setComment({ text: "" });
  };

  // to handle the trash for comment
  const handleCommentTrash = () => {
    setCommentDeleteOption(true);
  };

  // to handle comment edit
  const handleCommentEdit = () => {
    setCommentEdit(true);
  };

  return (
    <div
      className={`relative md:w-[750px] lg:w-[730px] m-auto ${
        commentDeleteOption ? "overflow-y-hidden" : ""
      }`}
    >
      {loginAlert ? <NotLoginAlert /> : null}
      <div
        className={`md:w-[750px] ${
          loginAlert ? "blur" : ""
        } lg:w-[730px] h-full relative m-auto ${
          commentDeleteOption ? "blur" : ""
        }`}
      >
        <div
          className={`bg-black relative text-white md:w-[600px] lg:w-[700px] m-auto rounded-lg border border-solid border-black`}
        >
          <div
            className={`${deleteConfirm ? "blurDetailPost" : ""} ${
              editPost ? "blurDetailPost" : ""
            }`}
          >
            <div className="flex justify-between">
              <div className="flex my-3 ms-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={post?.user?.profile_url}
                  alt=""
                />
                <span className="mt-2 ms-3">{post?.user?.name}</span>
              </div>
              <EllipsisHorizontalIcon
                onClick={handleMenu}
                className="w-10 h-10 cursor-pointer me-3 py-2 mt-3 relative right-0 hover:bg-gray-300 hover:text-black rounded-full"
              />
            </div>
            <img className="w-full" src={post.postImage} alt="" />
            <div className="p-4">
              <h4 className="font-semibold text-lg">{post?.post?.title}</h4>
              <p>{post.content}</p>
              <p>Created at : {post.created_at}</p>
            </div>
            <div className="text-center mt-10 flex justify-center align-middle">
              <input
                className="mb-3 p-2 w-[400px] rounded-lg text-black"
                value={comment.text}
                onChange={handleComment}
                type="text"
                onClick={checkLogin}
                placeholder="Write a comment..."
              />
              <PaperAirplaneIcon
                onClick={handleCommentSend}
                className="text-sm w-10 h-w-10 mb-3 cursor-pointer"
              />
            </div>
          </div>

          {/* confirm box for post */}
          {deleteConfirm ? <ConfirmDelete /> : null}
          {/* confirm box for post */}

          {/* Edit post section */}
          {editPost ? <EditPost /> : null}
          {/* Edit post section */}
        </div>
        {/* menu box open */}
        {menu ? (
          <div className="bg-white md:w-[75px] text-center lg:w-[100px] absolute md:bottom-[75rem] md:right-0 lg:bottom-[78rem] lg:right-0 lg:left-[45rem] text-black rounded-lg p-3">
            <div className="flex">
              <div>
                <TrashIcon
                  onClick={handleDelete}
                  className="md:w-4 md:w-4 lg:w-5 lg:h-5 cursor-pointer"
                />
              </div>
              <div onClick={handleDelete} className="cursor-pointer ms-2">
                Delete
              </div>
            </div>
            <div className="flex">
              <div>
                <PencilIcon
                  onClick={handleEdit}
                  className="md:w-4 md:w-4 lg:w-5 lg:h-5 cursor-pointer"
                />
              </div>
              <div onClick={handleEdit} className="cursor-pointer ms-2">
                Edit
              </div>
            </div>
          </div>
        ) : null}
        {/* menu box close */}

        {/* show the comment any user ment */}
        {comments.map((comments, index) => (
          <div key={index} className="flex p-3">
            <img
              className="w-10 h-10 rounded-full"
              src={comments?.user?.profile_url}
              alt=""
            />
            <div className="ms-2 flex shadow bg-white rounded-xl">
              <div className="p-2">
                <p className="font-semibold">{comments?.user?.name}</p>
                <p>{comments.text}</p>
              </div>
              <div className="mt-2 me-1">
                <EllipsisVerticalIcon
                  // put related comment id to showCommentId state for show the related comment menu
                  onClick={() => {
                    setShowCommentId(comments.id);
                    setCommentMenu(!commentMenu);
                  }}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
            {/* delete and edit box for comment */}
            {showCommentId === comments.id && commentMenu ? (
              <div className="bg-white text-black ms-2 p-2 rounded-lg">
                <div className="flex">
                  <div>
                    <TrashIcon
                      onClick={() => {
                        setCommentId(comments.id);
                        handleCommentTrash();
                      }}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <PencilIcon
                      onClick={() => {
                        setCommentId(comments.id);
                        handleCommentEdit();
                      }}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ) : null}
            {/* delete and edit box for comment */}
          </div>
        ))}
      </div>
      {/* delete comment box */}
      {commentDeleteOption ? <ConfirmCommentDelete /> : null}

      {/* edit comment box */}
      {commentEdit ? <EditComment /> : null}
    </div>
  );
}

export default DetailComponent;
