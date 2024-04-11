import React, { useContext, useState } from "react";
import moment from "moment";

const AuthContext = React.createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    profile_url: "",
    name: "",
    email: "",
    phone: "",
    confirm: "",
  });
  const [createBox, setCreateBox] = useState(false);
  const [editBox, setEditBox] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [commentUserId, setCommentUserId] = useState("");

  // check user login or not. If user not login alert open and navigate to login page. This state is open and close the login alert
  const [loginAlert, setLoginAlert] = useState(false);

  // when delete comment ask confrim or cancel / use this state in DetailComponent.jsx
  const [commentDeleteOption, setCommentDeleteOption] = useState(false);

  // put comment id to delete specified individual comment
  const [commentId, setCommentId] = useState();

  // this state for comment edit
  const [commentEdit, setCommentEdit] = useState(false);

  const [comment, setComment] = useState({
    text: "",
    postId: "",
    userId: "",
  });
  const [post, setPost] = useState({
    title: "",
    content: "",
    postImage: "",
    userId: "",
    created_at: moment().startOf("hour").fromNow(),
  });
  const logout = () => {
    setUserData(null);
  };
  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        logout,
        setCreateBox,
        createBox,
        setEditBox,
        editBox,
        userInfo,
        setUserInfo,
        deleteConfirm,
        setDeleteConfirm,
        post,
        setPost,
        editPost,
        setEditPost,
        comment,
        setComment,
        commentUserId,
        setCommentUserId,
        loginAlert,
        setLoginAlert,
        commentDeleteOption,
        setCommentDeleteOption,
        commentId,
        setCommentId,
        commentEdit,
        setCommentEdit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
