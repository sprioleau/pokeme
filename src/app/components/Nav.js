import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Wrap } from "@chakra-ui/react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";
import { GiCardRandom } from "react-icons/gi";
import { IoTrashOutline } from "react-icons/io5";

import { toggleModalVisibility, generateCards, deleteAllCards } from "../store/actions";
import { selectCards } from "../store/selectors";
import NewCard from "./NewCard";

const GENERATED_CARDS = 1;

function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/cards";
  const cards = useSelector(selectCards);

  const handleRemoveAllCards = () => {
    const ids = cards.map(({ id }) => id);
    dispatch(deleteAllCards(ids, history));
  };
  const handleGenerateCards = () => dispatch(generateCards(GENERATED_CARDS, history));
  const handleCreateNewCard = () => dispatch(toggleModalVisibility(<NewCard />));

  return (
    <nav className="nav">
      <Link to="/">
        <img className="nav__logo" src="../images/logo/pokeme_logo.png" alt="pokéme logo" />
      </Link>
      <Wrap>
        <Box p="4">
          <Link to="/" className="no-decoration">
            <Button type="button" className="btn">All Cards</Button>
          </Link>
        </Box>
        {/* <Spacer /> */}
        {isHome && (
          <>
            {cards.length > 0 && (
              <>
                <Box p="4">
                  <Button type="button" className="btn" onClick={handleRemoveAllCards}>
                    <span className="btn-icon"><IoTrashOutline /></span>Drop all cards
                  </Button>
                </Box>
                {/* <Spacer /> */}
              </>
            )}
            <Box p="4">
              <Button type="button" className="btn" onClick={handleGenerateCards}><span className="btn-icon"><GiCardRandom /></span>
                {`Generate ${GENERATED_CARDS > 1 ? `${GENERATED_CARDS} Cards` : "a Card"}`}
              </Button>
            </Box>
            {/* <Spacer /> */}
          </>
        )}
        <Box p="4">
          <Button type="button" className="btn" onClick={handleCreateNewCard}><span className="btn-icon"><FiPlusSquare /></span>Create New Card</Button>
        </Box>
      </Wrap>
    </nav>
  );
}

export default Nav;
