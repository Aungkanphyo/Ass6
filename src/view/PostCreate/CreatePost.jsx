// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function CreatePost() {
  const { setCreateBox, post, setPost, userInfo } = useAuth();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
      userId: userInfo.id,
    });
  };

  const handlePost = () => {
    axios
      .post("http://localhost:3030/Posts", post)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const handleClose = () => {
    setCreateBox(false);
  };
  return (
    <div className="absolute top-[7rem] left-20">
      <form className="bg-black rounded-lg w-[400px] h-[430px] m-auto mt-10 text-white p-10">
        <button onClick={handleClose} className="ms-80 mb-">
          x
        </button>
        <h1 className="text-center my-3 font-medium text-2xl">
          To upload post
        </h1>
        <div className="ms-10">
          <div>
            <div className="text-lg">Title</div>
            <input
              className="p-2 rounded-xl text-black"
              value={post.title}
              onChange={handleInput}
              name="title"
              type="text"
              placeholder="Write title..."
            />
          </div>
          <div className="my-3">
            <div className="text-lg">Content</div>
            <input
              className="p-2 rounded-xl text-black"
              value={post.content}
              onChange={handleInput}
              name="content"
              type="text"
              placeholder="Write content..."
            />
          </div>
          <div>
            <div className="text-lg">Post image url</div>
            <input
              className="p-2 rounded-xl text-black"
              value={post.postImage}
              onChange={handleInput}
              name="postImage"
              type="text"
              placeholder="Enter profile url..."
            />
          </div>
          <button
            onClick={handlePost}
            className="bg-green-400 p-2 rounded-lg w-20 mt-3 ms-44"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
