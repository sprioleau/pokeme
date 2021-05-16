import React from "react";
import { useSelector } from "react-redux";

import moves from "../../data/pokemon-moves";
import pokemonTypes from "../../data/pokemon-types";
import { getRandomFromArray } from "../../api/functions/api.functions";
import CardForm from "./CardForm";
// import { formatFeet, formatInches, formatWeight } from "./functions";
import { selectCurrentCard } from "../../store/selectors";

const CardFormWrapper = ({ action }) => {
	const currentCard = useSelector(selectCurrentCard);

	const newCardInitialState = {
		name: "",
		photoUrl: "",
		type: getRandomFromArray(pokemonTypes.slice(0, 5)),
		weakness: getRandomFromArray(pokemonTypes.slice(5, pokemonTypes.length)),
		height: {
			feet: 5,
			inches: 6,
		},
		weight: 100,
		attacks: {
			move1: getRandomFromArray(moves),
		},
		hitPoints: 100,
		message: "",
		isSpecial: false,
		showSpecial: true,
	};

	const initialStateProps = action === "create" ? newCardInitialState : currentCard;

	return (
		<CardForm action={action} initialState={initialStateProps} />
	);
};

export default CardFormWrapper;
