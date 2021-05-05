import React from "react";
import { useDispatch } from "react-redux";
import { toggleModalVisibility } from "../store/actions";
import NewCard from "./NewCard";

function Banner() {
  const dispatch = useDispatch();

  const handleCreateNewCard = () => dispatch(toggleModalVisibility(<NewCard />));

  return (
    <div className="banner">
      <button type="button" onClick={handleCreateNewCard}>Create New Card</button>
    </div>
  );
}

export default Banner;
