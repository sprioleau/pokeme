import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ThreeDCard from "react-animated-3d-card";
import ReactMarkdown from "react-markdown";

import typeColors from "../data/pokemon-type-colors";
import * as actions from "../store/actions";
import CardToolbar from "./CardToolbar";

const Card = () => {
  const [card, setCard] = useState(null);
  const dispatch = useDispatch();
  const { cardId } = useParams();

	useEffect(() => {
    dispatch(actions.fetchCard(cardId, (data) => setCard(data)));
	}, []);

  if (!card) return null;

  const getImageSourceFromType = (type) => `../images/pokeme-types/${card.type ? `${type.toLowerCase()}.svg` : "bug.svg"}`;

  return (
    <div className="card-positioner">
      <CardToolbar cardId={cardId} />
      <ThreeDCard
        style={{
          backgroundImage: "url(../images/smoke.png)",
          backgroundColor: typeColors[card.type],
          width: "20rem",
          minHeight: "calc(20rem * 2 / 3)",
          backgroundBlendMode: "multiply",
          border: "0.75rem solid #ffcb05",
          borderRadius: "1rem",
          padding: "1rem 1.5rem 0.75rem",
          fontSize: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <header className="card__header">
          <h3 className="card__name">{card.name}</h3>
          <div className="card__header-right">
            <span className="card__hit-points">{card.hitPoints}</span>
            <img className="card__type-badge icon" src={getImageSourceFromType(card.type)} alt={card.name} />
          </div>
        </header>
        <img className="card__image" src={card.photoUrl} alt={card.name} />
        <div className="card__anatomy">
          <p className="card__anatomy-text">{`${card.type} PokéMe`}</p>
          <p className="card__anatomy-text">{`Length: ${card.height.ft}' ${card.height.in}"`}</p>
          <p className="card__anatomy-text">{`Weight: ${card.weight} lbs`}</p>
        </div>
        <ul className="card__attacks">{card.attacks.map((attack) => (
          <li key={attack.name} className="card__attack">
            <div className="card__attack-energy-cost"><EnergyCostIcons cost={attack.energyCost} type={attack.type} /></div>
            <div className="card__attack-name-description"><span className="card__attack-name">{attack.name}</span> <span className="card__attack-description">{attack.description}</span></div>
            <div className="card__attack-damage">{attack.damage}</div>
          </li>
          ))}
        </ul>
        <ul className="card__utility-stats">
          <li className="card__utility-stat">
            <span className="card__utility-stat-text">weakness</span>
            <div className="card__icon type weakness">
              <img className="icon small" src={getImageSourceFromType(card.weakness)} alt={card.weakness} width="100%" height="auto" />
            </div>
          </li>
          <li className="card__utility-stat resistance">
            <span className="card__utility-stat-text">resistance</span>
            <div className="card__icon type" />
          </li>
          <li className="card__utility-stat">
            <span className="card__utility-stat-text">retreat cost</span>
            <div className="card__icon type"><RetreatCostIcons cost={card.retreatCost} /></div>
          </li>
        </ul>
        <p className="card__description">{card.description}</p>
        <footer className="card__footer">
          <span className="card__footer-text">Created by <a href="https://github.com/sprioleau">San&apos;Quan Prioleau</a> for <a href="http://cs52.me/">CS52</a></span>
        </footer>
      </ThreeDCard>
      {card && (
        <div className="message"><ReactMarkdown>{card.message}</ReactMarkdown></div>
      )}
    </div>
  );
};

export default Card;

const RetreatCostIcons = ({ cost }) => (cost === 0 ? "0" : Array.from(Array(cost),
  (_, index) => (<img key={index} className="icon small" src="../images/pokeme-types/retreat.svg" alt="retreat symbol" />)));

const EnergyCostIcons = ({ cost, type }) => Array.from(Array(cost),
  (_, index) => (<img key={index} className="icon small" src={`../images/pokeme-types/${type.toLowerCase()}.svg`} alt="retreat symbol" />));
