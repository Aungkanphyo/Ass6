// eslint-disable-next-line no-unused-vars
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { Link } from "react-router-dom";

function HomePage() {
  const [post, setPost] = useState([]);
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/Posts?_expand=user")
      .then((res) => {
        const first10Posts = res.data.slice(0, 10);
        setPost(first10Posts);
        setAllPost(res.data);
      })
      .catch((error) => console.log(error));
  });

  return (
    <div>
      <div>
        <h3 className="text-center font-bold text-white text-3xl font-serif mt-3 underline underline-offset-2">
          Feature Posts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grip-cols-4 gap-5 mt-10">
          {post.map((post, index) => (
            <CardComponent key={index}>
              <Link to={`/detail/${post.id}`}>
                <div className="flex">
                  <img
                    className="rounded-full object-cover w-10 h-10 ms-4 my-5"
                    src={post?.user?.profile_url}
                    alt=""
                  />
                  <span className="ms-3 mt-6">{post?.user?.name}</span>
                </div>
                <img src={post.postImage} alt="" />
                <div className="p-4">
                  <h4 className="font-semibold mb-3">{post.title}</h4>
                  <p>{post.content}</p>
                  {/* <Link to="/detail" className="mt-10 underline decoration-1 text-xs text-blue-500">Details</Link> */}
                  <p className="mt-3 text-xs">
                    Created at :{" "}
                    <span className="text-blue-500">{post.created_at}</span>
                  </p>
                </div>
              </Link>
            </CardComponent>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-center font-bold text-white text-3xl font-serif mt-3 underline underline-offset-2">
          All Posts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grip-cols-4 gap-5 mt-10">
          {allPost.map((post, index) => (
            <CardComponent key={index}>
              <Link to={`/detail/${post.id}`}>
                <div className="flex">
                  <img
                    className="rounded-full object-cover w-10 h-10 ms-4 my-5"
                    src={post?.user?.profile_url}
                    alt=""
                  />
                  <span className="ms-3 mt-6">{post?.user?.name}</span>
                </div>
                <img src={post.postImage} alt="" />
                <div className="p-4">
                  <h4 className="font-semibold mb-3">{post.title}</h4>
                  <p>{post.content}</p>
                  {/* <Link to="/detail" className="mt-10 underline decoration-1 text-xs text-blue-500">Details</Link> */}
                  <p className="mt-3 text-xs">
                    Created at :{" "}
                    <span className="text-blue-500">{post.created_at}</span>
                  </p>
                </div>
              </Link>
            </CardComponent>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
