import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ThreeDCard from "react-animated-3d-card";
import ReactMarkdown from "react-markdown";

import typeColors from "../data/pokemon-type-colors";
import * as actions from "../store/actions";
import CardToolbar from "./CardToolbar";

const Card = () => {
  const [cardContent, setCardContent] = useState(null);
  const dispatch = useDispatch();
  const { cardId } = useParams();

	useEffect(() => {
    dispatch(actions.fetchCard(cardId, (data) => setCardContent(JSON.parse(data.title))));
	}, []);

  if (!cardContent) return null;

  const getImageSourceFromType = (type) => `../images/pokeme-types/${cardContent.type ? `${type.toLowerCase()}.svg` : "bug.svg"}`;

  return (
    <div className="card-positioner">
      <CardToolbar cardId={cardId} />
      <ThreeDCard>
        {cardContent && (

          <div className="card" style={{ backgroundImage: "url(../images/smoke.png)", backgroundColor: typeColors[cardContent.type] }}>
            <div className="card__container">
              <div className="card__wrapper">
                <header className="card__header">
                  <h3 className="card__name">{cardContent.name}</h3>
                  <div className="card__header-right">
                    <span className="card__hit-points">{cardContent.hitPoints}</span>
                    <img className="card__type-badge icon" src={getImageSourceFromType(cardContent.type)} alt={cardContent.name} />
                  </div>
                </header>
                <img className="card__image" src={cardContent.photoUrl} alt={cardContent.name} />
                <div className="card__anatomy">
                  <p className="card__anatomy-text">{`${cardContent.type} PokéMe`}</p>
                  <p className="card__anatomy-text">{`Length: ${cardContent.height.ft}' ${cardContent.height.in}"`}</p>
                  <p className="card__anatomy-text">{`Weight: ${cardContent.weight} lbs`}</p>
                </div>
                <ul className="card__attacks">{cardContent.attacks.map((attack) => (
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
                      <img className="icon small" src={getImageSourceFromType(cardContent.weakness)} alt={cardContent.weakness} width="100%" height="auto" />
                    </div>
                  </li>
                  <li className="card__utility-stat resistance">
                    <span className="card__utility-stat-text">resistance</span>
                    <div className="card__icon type" />
                  </li>
                  <li className="card__utility-stat">
                    <span className="card__utility-stat-text">retreat cost</span>
                    <div className="card__icon type"><RetreatCostIcons cost={cardContent.retreatCost} /></div>
                  </li>
                </ul>
                <p className="card__description">{cardContent.description}</p>
                <footer className="card__footer">
                  <span className="card__footer-text">Created by <a href="https://github.com/sprioleau">San&apos;Quan Prioleau</a> for <a href="http://cs52.me/">CS52</a></span>
                </footer>
              </div>
            </div>
          </div>
        )}
      </ThreeDCard>
      {cardContent && (
        <div className="message"><ReactMarkdown>{cardContent.message}</ReactMarkdown></div>
      )}
    </div>
  );
};

export default Card;

const RetreatCostIcons = ({ cost }) => (cost === 0 ? "0" : Array.from(Array(cost),
  (_, index) => (<img key={index} className="icon small" src="../images/pokeme-types/retreat.svg" alt="retreat symbol" />)));

const EnergyCostIcons = ({ cost, type }) => Array.from(Array(cost),
  (_, index) => (<img key={index} className="icon small" src={`../images/pokeme-types/${type.toLowerCase()}.svg`} alt="retreat symbol" />));
