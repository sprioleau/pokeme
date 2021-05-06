import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { useSpring, a } from "@react-spring/web";
import ThreeDCard from "react-animated-3d-card";

import * as actions from "../store/actions";
import CardToolbar from "./CardToolbar";

// const ASPECT_RATIO = 4 / 5;

const Card = () => {
  const [cardContent, setCardContent] = useState(null);
  const dispatch = useDispatch();
  const { cardId } = useParams();

  // Card flip animation config
  // Copied from: https://codesandbox.io/s/spring-flip-card-knkfh?file=/src/App.tsx:40-89
  // const [flipped, setFlipped] = useState(false);

  // const transformString = `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`;

  // const { transform, opacity } = useSpring({
  //   opacity: flipped ? 1 : 0,
  //   transform: transformString,
  //   config: { mass: 5, tension: 500, friction: 80 },
  // });

  // const handleFlipCard = () => setFlipped(!flipped);

	useEffect(() => {
    dispatch(actions.fetchCard(cardId, (data) => setCardContent(JSON.parse(data.title))));
	}, []);

  if (!cardContent) return null;

  // const heightString = `calc((80vmin - 2 * 4vmin) * 1 / ${ASPECT_RATIO})`;

  const getImageSourceFromType = (type) => `../images/pokeme-types/${cardContent.type ? `${type.toLowerCase()}.svg` : "bug.svg"}`;

  return (
    <div className="card-positioner">
      <CardToolbar cardId={cardId} />
      <ThreeDCard
          style={{
            backgroundColor: "red",
            width: "450px",
            // width: "calc(80vmin - 2 * 4vmin)",
            height: "100%",
            cursor: "pointer"
          }}
          // onClick={handleFlipCard}
      >
        <div className="card">
        {/* <a.div className="card" style={{ opacity: opacity.to((o) => 1 - o), transform }} onClick={handleFlipCard}> */}
          <div className="card__container">
            <div className="card__wrapper">
              <header className="card__header">
                <h3 className="card__name">{cardContent.name}</h3>
                <div className="card__header-right">
                  <span className="card__hit-points">100 HP</span>
                  <img className="card__type-badge icon" src={getImageSourceFromType(cardContent.type)} alt={cardContent.name} />
                </div>
              </header>
              <img className="card__image" src={cardContent.photoUrl} alt={cardContent.name} />
              <div className="card__anatomy">
                <p className="card__anatomy-text">{`${cardContent.type} PokéMe`}</p>
                <p className="card__anatomy-text">{`Length: ${cardContent.height}`}</p>
                <p className="card__anatomy-text">{`Weight: ${cardContent.weight}`}</p>
              </div>
              {/* <div className="divider" /> */}
              <ul className="card__attacks">{cardContent.attacks.map((attack) => (
                <li key={attack.name} className="card__attack">
                  <div className="card__attack-energy-cost">{attack.stones.energyCost}</div>
                  <div className="card__attack-name-description"><span className="card__attack-name">{attack.name}</span> <span className="card__attack-description">{attack.description}</span></div>
                  <div className="card__attack-damage">{attack.stones.damage}</div>
                </li>
                ))}
                <div className="divider" />
              </ul>
              <ul className="card__utility-stats">
                <li className="card__utility-stat">
                  <span className="card__utility-stat-text">weakness</span>
                  <div className="card__icon type weakness"><img src={getImageSourceFromType(cardContent.weakness)} alt={cardContent.weakness} width="100%" height="auto" /></div>
                </li>
                <li className="card__utility-stat resistance">
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
          {/* <div className="card">
          <a.div className="card" style={{ opacity, transform, rotateX: "180deg", }}>
            <div className="card__container">
              <div className="card__wrapper">
                <h2>Hello there!</h2>
              </div>
            </div>
          </div> */}
        </div>
      </ThreeDCard>
    </div>
  );
};

export default Card;
