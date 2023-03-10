import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { fetchCards } from "../store/actions/index";
import { selectCards, selectFilter, selectIsLoading } from "../store/selectors";
import Filter from "./Filter";
import Loading from "./Loading";

const Cards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
		dispatch(fetchCards());
  }, []);

  if (isLoading) return <Loading loadingMessage="Loading" />;
  if (cards.length === 0) return null;

  const displayedCards = filter === "" ? cards : cards.filter(({ type }) => type === filter);

  return (
    <>
    <Filter />
    <div className="cards">
      <ul className="cards__list">
        {cards.length > 0 && displayedCards.map((card) => {
          return (
            <li key={card.id} className="cards__list-item">
              <NavLink to={`/cards/${card.id}`}>
                <Tilt
                  className="parallax"
                  perspective={1000}
                  glareEnable
                  glareMaxOpacity={0.45}
                  scale={1.02}
                >
                  <div key={card.id} className="cards__card" style={{ backgroundImage: "url(../images/card-bg.png)" }}>
                    <div className="cards__card-wrapper" />
                  </div>
                  <img className="cards__card-type-badge" src={`../images/pokeme-types/${card.type ? `${card.type.toLowerCase()}.svg` : "bug.svg"}`} alt={card.name} />
                </Tilt>
              </NavLink>
              <h4 className="cards__card-name" to={`/cards/${card.id}`}>{card.name}</h4>
              <p className="cards__card-byline">{`PokéMe by ${card.authorName}`}</p>
            </li>
          );
        })}
      </ul>
    </div>
    </>
  );
};

export default Cards;
