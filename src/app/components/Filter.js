import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiFilterOffLine } from "react-icons/ri";

import { setFilter } from "../store/actions";
import { selectCards, selectFilter } from "../store/selectors/index";

const Filter = () => {
  const cards = useSelector(selectCards);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleSetFilter = (type) => dispatch(setFilter(type));
  const handleClearFilter = () => dispatch(setFilter(""));

  const cardTypes = cards.map(({ type }) => type);
  const uniqueTypes = [...new Set(cardTypes)];

  if (cards?.length === 0 || uniqueTypes.length <= 1) return null;

  return (
    <div className="filter">
      <h3 className="filter__title">Filter by Type:</h3>
      <ul className="filter__list">
        {filter && (
          <li className="filter__list-item" onClick={handleClearFilter}>
            <span className="filter__list-item-icon icon clear-filter"><RiFilterOffLine /></span>
          </li>
        )}
        {uniqueTypes.map((type) => (
          <li key={type} className={`filter__list-item${type === filter ? " current" : ""}`}>
            <img className="filter__list-item-image icon" src={`../images/pokeme-types/${type.toLowerCase()}.svg`} alt={type} onClick={() => handleSetFilter(type)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
