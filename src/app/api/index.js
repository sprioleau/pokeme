import axios from "axios";
import { toast } from "react-toastify";
import { getName, getRandomFromArray, getAttacks, getHitPoints } from "./functions/api.functions";
import pokemonTypes from "../data/pokemon-types";
import moves from "../data/pokemon-moves";

const ROOT_URL = "https://platform.cs52.me/api";
const API_KEY = "s_prioleau";
const API_ROUTE = "posts";

// eslint-disable-next-line
export const fetchCardsFromApi = async (callback) => {
	try {
		const { data } = await axios.get(`${ROOT_URL}/${API_ROUTE}?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		toast("🔴 Uh oh! We got an error when trying to load your cards.");
		return console.error(error);
	}
};

// Create
export const createCardFromApi = async (card, callback) => {
	console.log("JSON.stringify(card):", JSON.stringify(card));
	const cardObject = {
		title: JSON.stringify(card),
	};

	try {
		const { data } = await axios.post(`${ROOT_URL}/${API_ROUTE}?key=${API_KEY}`, cardObject);
		return callback(data);
	} catch (error) {
				toast("🔴 Uh oh! There was an error when trying to crate your card.");
		return console.error(error);
	}
};

// Read
export const fetchCardFromApi = async (id, callback) => {
	try {
		const { data } = await axios.get(`${ROOT_URL}/${API_ROUTE}/${id}?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		toast("🔴 Uh oh! There was an error when trying to update your card.");
		return console.error(error);
	}
};

// Update
export const updateCardFromApi = async (id, updatedFields, callback) => {
	try {
		const { data } = await axios.put(`${ROOT_URL}/${API_ROUTE}/${id}?key=${API_KEY}`, updatedFields);
		return callback(data);
	} catch (error) {
		toast("🔴 Uh oh! There was an error when trying to update your card.");
		return console.error(error);
	}
};

// Delete
export const deleteCardFromApi = async (id, callback) => {
	try {
		const { data } = await axios.delete(`${ROOT_URL}/${API_ROUTE}/${id}?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		toast("🔴 Uh oh! There was an error when trying to delete your card.");
		return console.error(error);
	}
};

export const generateCards = async (quantity, callback) => {
	try {
		const { data } = await axios.get(`https://randomuser.me/api/?results=${quantity}`);
		const cards = data.results.map(({ name, picture, dob }) => ({
			name: getName(name),
			photoUrl: picture.large,
			type: getRandomFromArray(pokemonTypes),
			attacks: getAttacks(moves),
			hitPoints: getHitPoints(),
			height: {
				ft: 5,
				in: 10
			},
			weight: dob.age * 2,
			weakness: getRandomFromArray(pokemonTypes),
			retreatCost: getRandomFromArray([1, 2, 3]),
			description: "A lovely PokéMe with an exceptional personality."
		}));
		console.log("cards:", cards);
		return callback(cards);
	} catch (error) {
		toast("🔴 Uh oh! There was an error when trying to generate cards.");
		return console.error(error);
	}
};

export const dropAllEntriesFromApi = (arrayOfIds) => arrayOfIds.forEach((id) => deleteCardFromApi(id, () => toast(`Deleted entry with id: ${id}`)));
