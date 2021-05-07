import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useHistory, Link } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";
import { CgCPlusPlus } from "react-icons/cg";
import { IoTrashOutline } from "react-icons/io5";

import { generateCards } from "../store/actions";
// import { toggleModalVisibility, generateCards } from "../store/actions";
import { selectCards } from "../store/selectors";
// import NewCard from "./NewCard";
import { dropAllEntriesFromApi } from "../api";

function Banner() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cards = useSelector(selectCards);

  const handleRemoveAllCards = () => {
    dropAllEntriesFromApi(cards.map(({ id }) => id));
    history.pushState("/");
  };
  // const handleCreateNewCard = () => dispatch(toggleModalVisibility(<NewCard />));
  const handleGenerateCards = () => dispatch(generateCards(20));

  return (
    <div className="banner">
      <Link to="/">
        <img className="banner__logo" src="../images/logo/pokeme_logo.png" alt="pokéme logo" />
      </Link>
      <ButtonGroup>
      <Button type="button" className="btn" onClick={handleRemoveAllCards}>
        <span className="btn-icon"><IoTrashOutline /></span>Drop all cards
      </Button>
      <Button type="button" className="btn" onClick={handleGenerateCards}><span className="btn-icon"><CgCPlusPlus /></span>Generate Cards</Button>
      <Link to="/cards/new">
        <Button type="button" className="btn"><span className="btn-icon"><FiPlusSquare /></span>Create New Card</Button>
      </Link>
      </ButtonGroup>
    </div>
  );
}

export default Banner;
