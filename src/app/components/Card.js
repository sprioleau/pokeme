import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import * as actions from "../store/actions";
import CardToolbar from "./CardToolbar";

const Card = () => {
  const dispatch = useDispatch();
  const { cardId } = useParams();

  const [cardContent, setCardContent] = useState(null);

	useEffect(() => {
    dispatch(actions.fetchCard(cardId, (data) => setCardContent(JSON.parse(data.title))));
	}, []);

  if (!cardContent) return null;

  return (
    <>
      <CardToolbar cardId={cardId} />
      <div className="card">
        <div className="card__container">
          <div className="card__wrapper">
            <header className="card__header">
              <h3 className="card__name">{cardContent.name}</h3>
              <div className="card__header-right">
                <span className="card__hit-points">100 HP</span>
                <img className="card__type-badge icon" src={`../images/pokeme-types/${cardContent.type ? `${cardContent.type.toLowerCase()}.svg` : "bug.svg"}`} alt={cardContent.name} />
              </div>
            </header>
            <img className="card__image" src={cardContent.photoUrl} alt={cardContent.name} />
            <div className="card__anatomy">
              <p className="card__anatomy-text">{`${cardContent.type} PokéMe`}</p>
              <p className="card__anatomy-text">{`Length: ${cardContent.height}`}</p>
              <p className="card__anatomy-text">{`Weight: ${cardContent.weight}`}</p>
            </div>
            <ul className="card__attacks">{cardContent.attacks.map((attack) => (
              <li key={attack} className="card__attack">{attack}</li>
            ))}
            </ul>
            <ul className="card__utility-stats">
              <li className="card__utility-stat">
                <span className="card__utility-stat-text">weakness</span>
                <div className="card__icon type">{cardContent.weakness}</div>
              </li>
              <li className="card__utility-stat">
                <span className="card__utility-stat-text">resistance</span>
                <div className="card__icon type" />
              </li>
              <li className="card__utility-stat">
                <span className="card__utility-stat-text">retreat cost</span>
                <div className="card__icon type">{cardContent.retreatCost}</div>
              </li>
            </ul>
            <p className="card__description">A brutal PokéMe with pressurizd water jets on its shell. They are used for high-speed tackles.</p>
            <footer className="card__footer">
              <span className="card__footer-text">Created by <a href="https://github.com/sprioleau">San&apos;Quan Prioleau</a> for <a href="http://cs52.me/">CS52</a></span>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
