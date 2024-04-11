// eslint-disable-next-line no-unused-vars
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const { postId } = useParams();
  const { setEditPost, setPost, post,userInfo } = useAuth();

  const handleInput = (e)=>{
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
      userId:userInfo.id
    });
  }

  const handleEdit = () => {
    setEditPost(false);
    axios.put(`http://localhost:3030/posts/${postId}`,post).then((res)=>console.log(res)).catch((error)=>console.log(error));
  };

  const handleClose = () => {
    setEditPost(false);
  };
  return (
    <div className="bg-black rounded-xl w-[300px] absolute right-[10rem] top-20">
      <div className="relative mb-3">
        <button
          onClick={handleClose}
          className="text-white absolute right-4 top-2"
        >
          x
        </button>
      </div>
      <div className="text-white p-5">
        <h1 className="text-center font-serif text-xl mb-3">Edit Post</h1>
        <div className="ms-3">
          <div>
            <label htmlFor="title">Title</label>
          </div>
          <input
            className="rounded-lg p-1 mb-2 text-black"
            value={post.title}
            onChange={handleInput}
            type="text"
            name="title"
            id="profile"
          />
          <div>
            <label htmlFor="content">Content</label>
          </div>
          <input
            className="rounded-lg p-1 mb-5 text-black"
            value={post.content}
            onChange={handleInput}
            type="text"
            name="content"
            id="name"
          />
          <div>
            <label htmlFor="postImage">Post image url</label>
          </div>
          <input
            name="postImage"
            value={post.postImage}
            onChange={handleInput}
            className="rounded-lg p-1 mb-5 text-black"
            type="text"
            id="postImageUrl"
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

export default EditPost;
