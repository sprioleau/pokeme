import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Wrap } from "@chakra-ui/react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";
import { GiCardRandom } from "react-icons/gi";
import { IoTrashOutline } from "react-icons/io5";

import { toast } from "react-toastify";
import { toggleModalVisibility, generateCards, deleteAllCards, signOutUser } from "../store/actions";
import { selectCards, selectIsAuthenticated } from "../store/selectors";
import CardFormWrapper from "./form/CardFormWrapper";

const GENERATED_CARDS_QUANTITY = 1;

const Nav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/cards";

  const cards = useSelector(selectCards);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleRemoveAllCards = () => {
    const ids = cards.map(({ id }) => id);
    dispatch(deleteAllCards(ids, history));
  };

  const handleGenerateCards = () => {
    if (!isAuthenticated) {
      toast("Sorry. You need to be signed in to generate a card.", { autoClose: 3000, position: "top-center" });
      return history.push("/signin");
    }

    return dispatch(generateCards(GENERATED_CARDS_QUANTITY, history));
  };

  const handleCreateNewCard = () => {
    if (!isAuthenticated) {
      toast("Sorry. You need to be signed in to create a card.", { autoClose: 3000, position: "top-center" });
      return history.push("/signin");
    }

    return dispatch(toggleModalVisibility(<CardFormWrapper action="create" />));
  };
  const handleSignOut = () => dispatch(signOutUser(history));

  return (
    <nav className="nav">
      <Link to="/">
        <img className="nav__logo" src="../images/logo/pokeme_logo.png" alt="pokéme logo" />
      </Link>
      <Wrap justify="center">
        <Box p="4">
          <Link to="/" className="no-decoration">
            <Button type="button" className="btn">All Cards</Button>
          </Link>
        </Box>
        {isAuthenticated ? (
          <Box p="4">
            <Link to="/" className="no-decoration">
              <Button type="button" className="btn" onClick={handleSignOut}>Sign Out</Button>
            </Link>
          </Box>
        ) : (
          <>
            <Box p="4">
              <Link to="/signup" className="no-decoration">
                <Button type="button" className="btn">Sign Up</Button>
              </Link>
            </Box>
            <Box p="4">
              <Link to="/signin" className="no-decoration">
                <Button type="button" className="btn">Sign In</Button>
              </Link>
            </Box>
          </>
        )}
        {isHome && (
          <>
            <Box p="4">
              <Button type="button" className="btn" onClick={handleGenerateCards}><span className="btn-icon"><GiCardRandom /></span>
                {`Generate ${GENERATED_CARDS_QUANTITY > 1 ? `${GENERATED_CARDS_QUANTITY} Cards` : "a Card"}`}
              </Button>
            </Box>
            {cards.length > 0 && (
              <Box p="4">
                <Button type="button" className="btn" onClick={handleRemoveAllCards}>
                  <span className="btn-icon"><IoTrashOutline /></span>Drop all cards
                </Button>
              </Box>
            )}
          </>
        )}
        <Box p="4">
          <Button type="button" className="btn" onClick={handleCreateNewCard}><span className="btn-icon"><FiPlusSquare /></span>Create New Card</Button>
        </Box>
      </Wrap>
    </nav>
  );
};

export default Nav;
