import React, { useEffect } from "react";
// import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../api";
import { fetchCards, generateCards } from "../store/actions/index";
import { selectCards } from "../store/selectors";

const Cards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  console.log("cards:", cards);

  useEffect(() => {
		dispatch(fetchCards());
	}, []);

  const handleGenerateCards = () => dispatch(generateCards(20));

  const handleSaveCardsToDatabase = () => {
    cards.forEach((card) => {
      // console.log("card:", card);
      api.createCardFromApi(card, (data) => console.log(data));
    });
  };

            //   <ul className="card__attacks">{attacks.map((attack) => (
            //   <li key={attack} className="card__attack">{ attack}</li>
            //   ))}
            // </ul>

  return (
    <div className="cards">
      <button type="button" onClick={handleGenerateCards}>Generate Cards</button>
      {cards.length > 0 && <button type="button" onClick={handleSaveCardsToDatabase}>Save Cards to Database</button>}
      {cards.length > 0 && cards.map((card) => (
        <pre key={card.name}>{ JSON.stringify(card, null, 2)}</pre>
      ))}
      {/* {cards.length > 0 && (
        <ul className="cards__list">
          { cards.map(({ name, photoUrl, type, attacks, height, weight, weakness, retreatCost }) => (
          <li key={name} className="card">
            <header className="card__header">
              <h3 className="card__name">{name}</h3>
              <span className="card__hit-points">100 HP</span>
              <div className="card__icon type">🌊</div>
            </header>
            <img src={photoUrl} alt={name} />
            <div className="card__anatomy">
              <p className="card__anatomy-text">{`${type} PokéMe`}</p>
              <p className="card__anatomy-text">{`Length: ${height}`}</p>
              <p className="card__anatomy-text">{`Weight: ${weight}`}</p>
            </div>

            <ul className="card__utility-stats">
              <li className="card__utility-stat">
                <span className="card__hit-points">weakness</span>
                <div className="card__icon type">{ weakness}</div>
              </li>
              <li className="card__utility-stat">
                <span className="card__hit-points">resistance</span>
                <div className="card__icon type" />
              </li>
              <li className="card__utility-stat">
                <span className="card__hit-points">retreat cost</span>
                <div className="card__icon type">{retreatCost}</div>
              </li>
            </ul>
            <p className="card__description">A brutal PokéMe with pressurizd water jets on its shell. They are used for high-speed tackles.</p>
            <footer className="card__footer">
              <span className="card__footer-text">Created by <a href="https://github.com/sprioleau">San&apos;Quan Prioleau</a> for <a href="http://cs52.me/">CS52</a></span>
            </footer>
          </li>
        ))}
        </ul>
      )} */}
    </div>
  );
};

export default Cards;
