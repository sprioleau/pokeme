import React from "react";
import { useDispatch } from "react-redux";
import { toggleModalVisibility } from "../store/actions";
import NewPost from "./NewPost";

function Banner() {
  const dispatch = useDispatch();

  const handleCreateNewPost = () => dispatch(toggleModalVisibility(<NewPost />));

  return (
    <div className="banner">
      <button type="button" onClick={handleCreateNewPost}>Create New Post</button>
    </div>
  );
}

export default Banner;
