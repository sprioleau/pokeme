import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RiEdit2Line } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import EditCard from "./EditCard";
import * as actions from "../store/actions";

const CardToolbar = ({ cardId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteCard = () => dispatch(actions.deleteCard(cardId, history));
  const handleEditCard = () => dispatch(actions.toggleModalVisibility(<EditCard />));

  return (
    <div className="card-toolbar">
      <span role="button" tabIndex={0} className="card-toolbar__icon icon edit" onClick={handleEditCard}>
        <RiEdit2Line />
      </span>
      <span role="button" tabIndex={0} className="card-toolbar__icon icon delete" onClick={handleDeleteCard}>
        <IoTrashOutline />
      </span>
    </div>
  );
};

export default CardToolbar;
