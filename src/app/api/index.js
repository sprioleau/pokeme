import axios from "axios";
import { getName, types, getRandomFromArray } from "./functions/api.functions";
// import { getName, types, weaknesses, getRandomFromArray } from "./functions/api.functions";

const ROOT_URL = "https://platform.cs52.me/api";
const API_KEY = "s_prioleau";
const API_ROUTE = "posts";

// eslint-disable-next-line
export const fetchCardsFromApi = async (callback) => {
	try {
		const { data } = await axios.get(`${ROOT_URL}/${API_ROUTE}?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! We got an error when trying to load your cards.", error);
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
		return console.error("🔴 Uh oh! There was an error when trying to crate your card.", error);
	}
};

// Read
export const fetchCardFromApi = async (id, callback) => {
	try {
		const { data } = await axios.get(`${ROOT_URL}/${API_ROUTE}/${id}?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to update your card.", error);
	}
};

// Update
export const updateCardFromApi = async (id, updatedFields, callback) => {
	try {
		const { data } = await axios.put(`${ROOT_URL}/${API_ROUTE}/${id}?key=${API_KEY}`, updatedFields);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to update your card.", error);
	}
};

// Delete
export const deleteCardFromApi = async (id, callback) => {
	try {
		const { data } = await axios.delete(`${ROOT_URL}/${API_ROUTE}/${id}?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to delete your card.", error);
	}
};

export const generateCards = async (quantity, callback) => {
	try {
		const { data } = await axios.get(`https://randomuser.me/api/?results=${quantity}`);
		const cards = data.results.map(({ name, picture, dob }) => ({
			name: getName(name),
			photoUrl: picture.large,
			type: getRandomFromArray(types),
			attacks: [
				{
					name: "Kick",
					description: "Does 40 damage plus 10 more damage for each type stone. You can's add more than 20 damage this way.",
					stones: {
						energyCost: 3,
						damage: "40+"
					}
				}
			],
			height: dob.age,
			weight: dob.age * 2,
			weakness: getRandomFromArray(types),
			retreatCost: getRandomFromArray([1, 2, 3])
		}));
		console.log("cards:", cards);
		return callback(cards);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to generate cards.", error);
	}
};

export const dropAllEntriesFromApi = (arrayOfIds) => arrayOfIds.forEach((id) => deleteCardFromApi(id, () => console.log(`deleted entry with id: ${id}`)));
