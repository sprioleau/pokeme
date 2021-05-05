// import React, { useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";

import * as actions from "../store/actions";
// import { selectCurrentCard } from "../store/selectors/index";

const Card = () => {
	// const currentCard = useSelector(selectCurrentCard);
	const { cardId } = useParams();
	const dispatch = useDispatch();
  const history = useHistory();

  const [cardContent, setCardContent] = useState(null);

	const handleDeleteCard = () => dispatch(actions.deleteCard(cardId, history));

	useEffect(() => {
    dispatch(actions.fetchCard(cardId, (data) => setCardContent(JSON.parse(data.title))));
	}, []);

  if (!cardContent) return null;

  return (
    <div className="card">
      <header className="card__header">
        <h3 className="card__name">{cardContent.title}</h3>
        <span className="card__hit-points">100 HP</span>
        <div className="card__icon type">🌊</div>
      </header>
      <img src={cardContent.coverUrl} alt={cardContent.title} />
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
          <span className="card__hit-points">weakness</span>
          <div className="card__icon type">{cardContent.weakness}</div>
        </li>
        <li className="card__utility-stat">
          <span className="card__hit-points">resistance</span>
          <div className="card__icon type" />
        </li>
        <li className="card__utility-stat">
          <span className="card__hit-points">retreat cost</span>
          <div className="card__icon type">{cardContent.retreatCost}</div>
        </li>
      </ul>
      <p className="card__description">A brutal PokéMe with pressurizd water jets on its shell. They are used for high-speed tackles.</p>
      <div className="card__toolbar">
        <p className="card__toolbar-icon icon delete" onClick={handleDeleteCard}>
          <IoTrashOutline />
        </p>
      </div>
      <footer className="card__footer">
        <span className="card__footer-text">Created by <a href="https://github.com/sprioleau">San&apos;Quan Prioleau</a> for <a href="http://cs52.me/">CS52</a></span>
      </footer>
    </div>
  );
};

export default Card;
