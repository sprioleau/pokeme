import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchCards } from "../store/actions/index";
import { selectCards, selectFilter } from "../store/selectors";
import Filter from "./Filter";

const Cards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const filter = useSelector(selectFilter);

  useEffect(() => {
		dispatch(fetchCards());
  }, []);

  const displayedCards = filter === "" ? cards : cards.filter((card) => JSON.parse(card?.title).type === filter);

  return (
    <>
    <Filter />
    <div className="cards">
      <ul className="cards__list">
        {cards.length > 0 && displayedCards.map((card) => {
          const cardContent = JSON.parse(card?.title);

          return (
            <li key={card.id} className="cards__list-item">
              <NavLink to={`/cards/${card.id}`}>
                <div key={card.id} className="cards__card" style={{ backgroundImage: "url(../images/card-bg.png)" }}>
                  <div className="cards__card-wrapper" />
                </div>
                <img className="cards__card-type-badge" src={`../images/pokeme-types/${cardContent.type ? `${cardContent.type.toLowerCase()}.svg` : "bug.svg"}`} alt={cardContent.name} />
                <h4 className="cards__card-name" to={`/cards/${card.id}`}>{cardContent.name}</h4>
              </NavLink>
            </li>
          );
        })}
        <BlankCard quantity={8} />
      </ul>
    </div>
    </>
  );
};

export default Cards;

const BlankCard = ({ quantity }) => Array.from(Array(quantity),
  (_, index) => (<li key={`blank-${index}`} className="cards__list-item collapse" />));
