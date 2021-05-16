import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RiEdit2Line } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../store/actions";
import { selectIsAuthenticated } from "../store/selectors";
import CardFormWrapper from "./form/CardFormWrapper";

const CardToolbar = ({ cardId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleDeleteCard = () => {
    if (!isAuthenticated) {
      toast("Sorry. You must be signed in to do edit a card.", { autoClose: 3000, position: "top-center" });
      return history.push("/signin");
    }

    return dispatch(actions.deleteCard(cardId, history));
  };

  const handleEditCard = () => {
    if (!isAuthenticated) {
      toast("Sorry. You must be signed in to do edit a card.", { autoClose: 3000, position: "top-center" });
      return history.push("/signin");
    }

    return dispatch(actions.toggleModalVisibility(<CardFormWrapper action="update" />));
  };

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
