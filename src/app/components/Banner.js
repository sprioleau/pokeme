import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useParams, useHistory, Link } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";
import { CgCPlusPlus } from "react-icons/cg";
import { IoTrashOutline } from "react-icons/io5";

import { toggleModalVisibility, generateCards } from "../store/actions";
import { selectCards } from "../store/selectors";
import NewCard from "./NewCard";
import { dropAllEntriesFromApi } from "../api";

function Banner() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cards = useSelector(selectCards);
  const { cardId } = useParams();
  console.log("cardId:", cardId);

  const handleRemoveAllCards = () => {
    dropAllEntriesFromApi(cards.map(({ id }) => id));
    history.pushState("/");
  };
  const handleCreateNewCard = () => dispatch(toggleModalVisibility(<NewCard />));
  const handleGenerateCards = () => dispatch(generateCards(20));

  return (
    <div className="banner">
      <Link to="/">
        <img className="banner__logo" src="../images/logo/pokeme_logo.svg" alt="pokéme logo" />
      </Link>
      <ButtonGroup>
        {!cardId && (
          <>
            <Button type="button" className="btn" onClick={handleRemoveAllCards}>
              <span className="btn-icon"><IoTrashOutline /></span>Drop all cards
            </Button>
            <Button type="button" className="btn" onClick={handleGenerateCards}><span className="btn-icon"><CgCPlusPlus /></span>Generate Cards</Button>
          </>
        )}
        <Button type="button" className="btn" onClick={handleCreateNewCard}><span className="btn-icon"><FiPlusSquare /></span>Create New Card</Button>
      </ButtonGroup>
    </div>
  );
}

export default Banner;
