import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Tilt from "react-parallax-tilt";

import * as actions from "../store/actions";
import CardToolbar from "./CardToolbar";

const Card = () => {
  const [card, setCard] = useState();
  const dispatch = useDispatch();
  const { cardId } = useParams();

  useEffect(() => {
    dispatch(actions.fetchCard(cardId, (data) => setCard(data)));
  }, []);

  if (!card) return null;

  const getImageSourceFromType = (type) => `../images/pokeme-types/${card.type ? `${type.toLowerCase()}.svg` : "bug.svg"}`;
  const getBgImageSourceFromType = (type) => `url(../images/pokeme-types/${card.type ? `${type.toLowerCase()}-bg.png)` : "url(../images/pokeme-types/bug-bg.png"}`;
  const getPokemeImage = () => `${card.photoUrl}`;

  return (
    <div className="card-positioner">
      <CardToolbar cardId={cardId} />
      <Tilt
        className="parallax"
        perspective={1000}
        glareEnable
        glareMaxOpacity={0.45}
        scale={1.02}
      >
        <div
          className={`card${card.isSpecial ? " special" : ""}`}
          style={{ backgroundImage: !card.isSpecial ? getBgImageSourceFromType(card.type) : "none", }}
        >
          <header className="card__header">
            <h3 className="card__name">{card.name}</h3>
            <div className="card__header-right">
              <span className="card__hit-points">{card.hitPoints}</span>
                <img className="card__type-badge icon" src={getImageSourceFromType(card.type)} alt={card.name} />
            </div>
          </header>
          <div className="card__image-wrapper">
            <img className="card__image" src={getPokemeImage()} alt={card.name} />
          </div>
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
        </div>
      </Tilt>
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
