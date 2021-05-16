import axios from "axios";
import { toast } from "react-toastify";
import { getName, getRandomFromArray, getAttacks, getHitPoints } from "./functions/api.functions";
import pokemonTypes from "../data/pokemon-types";
import moves from "../data/pokemon-moves";

const ROOT_URL = process.env.REACT_APP_ROOT_URL || "http://localhost:9090/api";
const API_ROUTE = "cards";

// eslint-disable-next-line
export const fetchCardsFromApi = async (callback) => {
	try {
		const { data } = await axios.get(`${ROOT_URL}/${API_ROUTE}`);
		return callback(data);
	} catch (error) {
		toast.error("🔴 Uh oh! We got an error when trying to load your cards.");
		return console.error(error);
	}
};

// Create
export const createCardFromApi = async (card, callback) => {
	try {
		const { data } = await axios.post(`${ROOT_URL}/${API_ROUTE}`, card, { headers: { authorization: localStorage.getItem("token") } });
		if (callback) return callback(data);
		return null;
	} catch (error) {
		toast.error("🔴 Uh oh! There was an error when trying to crate your card.");
		return console.error(error);
	}
};

// Read
export const fetchCardFromApi = async (id, callback) => {
	try {
		const { data } = await axios.get(`${ROOT_URL}/${API_ROUTE}/${id}`);
		if (callback) return callback(data);
		return null;
	} catch (error) {
		toast.error("🔴 Uh oh! There was an error when trying to update your card.");
		return console.error(error);
	}
};

// Update
export const updateCardFromApi = async (id, updatedFields, callback) => {
	try {
		const { data } = await axios.put(`${ROOT_URL}/${API_ROUTE}/${id}`, updatedFields, { headers: { authorization: localStorage.getItem("token") } });
		return callback(data);
	} catch (error) {
		toast.error("🔴 Uh oh! There was an error when trying to update your card.");
		return console.error(error);
	}
};

// Delete
export const deleteCardFromApi = async (id, callback) => {
	try {
		const { data } = await axios.delete(`${ROOT_URL}/${API_ROUTE}/${id}`, { headers: { authorization: localStorage.getItem("token") } });
		if (callback) return callback(data);
		return null;
	} catch (error) {
		toast.error(`🔴 Uh oh! There was an error when trying to delete your card. ${error}`);
		// return console.error(error);
		if (callback) return callback(error);
		return null;
	}
};

export const generateCardsFromApi = async (quantity, callback) => {
	try {
		const { data } = await axios.get(`https://randomuser.me/api/?results=${quantity}`);
		const cards = data.results.map(({ name, picture, dob }) => ({
			name: getName(name),
			photoUrl: picture.large,
			type: getRandomFromArray(pokemonTypes),
			attacks: getAttacks(moves),
			hitPoints: getHitPoints(),
			height: {
				feet: 5,
				inches: 10
			},
			weight: dob.age * 2,
			weakness: getRandomFromArray(pokemonTypes),
			retreatCost: getRandomFromArray([1, 2, 3]),
			description: "A lovely PokéMe with an exceptional personality.",
			message: "# Catchin 'em all!"
		}));
		return callback(cards);
	} catch (error) {
		toast.error("🔴 Uh oh! There was an error when trying to generate cards.");
		return console.error(error);
	}
};

// export const dropAllEntriesFromApi = (arrayOfIds) => arrayOfIds.forEach((id) => deleteCardFromApi(id, () => toast(`Deleted entry with id: ${id}`)));

// Sign Up
export const signUpUserFromApi = async ({ email, password, authorName }, callback) => {
	try {
		const { data } = await axios.post(`${ROOT_URL}/signup`, { email, password, authorName });
		if (callback) return callback(data);
		return null;
	} catch (error) {
		toast.error(`🔴 Uh oh! There was an error while trying to sign you up. ${error}`);
		return console.error(error);
	}
};

// Sign In
export const signInUserFromApi = async ({ email, password, authorName }, callback) => {
	try {
		const { data } = await axios.post(`${ROOT_URL}/signin`, { email, password, authorName });
		if (callback) return callback(data);
		return null;
	} catch (error) {
		toast.error(`🔴 Uh oh! There was an error while trying to sign you in. ${error}`);
		return console.error(error);
	}
};
