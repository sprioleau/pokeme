import React, { useEffect } from "react";
// import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as api from "../api";
import { fetchCards, generateCards } from "../store/actions/index";
import { selectCards } from "../store/selectors";

const Cards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);

  useEffect(() => {
		dispatch(fetchCards());
	}, []);

  const handleGenerateCards = () => dispatch(generateCards(20));

  const handleSaveCardsToDatabase = () => {
    cards.forEach((card) => {
      api.createCardFromApi(card, (data) => console.log(data));
    });
  };

  return (
    <div className="cards">
      <button type="button" onClick={handleGenerateCards}>Generate Cards</button>
      {cards.length > 0 && <button type="button" onClick={handleSaveCardsToDatabase}>Save Cards to Database</button>}
      <ul className="cards__list">
        {cards.length > 0 && cards.map((card) => {
          const cardContent = JSON.parse(card.title);

          return (
            <li className="cards__list-item">
              <NavLink to={`/cards/${card.id}`}>
                <div key={card.id} className="cards__card">
                  <div className="cards__card-wrapper" />
                </div>
                <img className="cards__card-type-badge" src={`../images/pokeme-types/${cardContent.type ? `${cardContent.type.toLowerCase()}.svg` : "bug.svg"}`} alt={cardContent.name} />
                <h4 className="cards__card-name" to={`/cards/${card.id}`}>{cardContent.name}</h4>
              </NavLink>
            </li>
          );
        })}
        <li key="blank-1" className="cards__list-item collapse" />
        <li key="blank-2" className="cards__list-item collapse" />
        <li key="blank-3" className="cards__list-item collapse" />
        <li key="blank-4" className="cards__list-item collapse" />
        <li key="blank-5" className="cards__list-item collapse" />
        <li key="blank-6" className="cards__list-item collapse" />
        <li key="blank-7" className="cards__list-item collapse" />
        <li key="blank-8" className="cards__list-item collapse" />
      </ul>
    </div>
  );
};

export default Cards;
