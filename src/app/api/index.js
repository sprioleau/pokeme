import axios from "axios";
import { getName, types, weaknesses, getRandomFromArray } from "./functions/api.functions";

const ROOT_URL = "https://platform.cs52.me/api";
const API_KEY = "s_prioleau";
const API_ROUTE = "posts";

// eslint-disable-next-line
export const fetchPostsFromApi = async (callback) => {
	try {
		const { data } = await axios.get(`${ROOT_URL}/${API_ROUTE}?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! We got an error when trying to load your posts.", error);
	}
};

// Create
export const createPostFromApi = async (post, callback) => {
	try {
		const { data } = await axios.post(`${ROOT_URL}/${API_ROUTE}?key=${API_KEY}`, post);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to crate your post.", error);
	}
};

export const createCardFromApi = async (card, callback) => {
	const databaseSafeCard = {
		content: JSON.stringify(card)
	};

	try {
		const { data } = await axios.post(`${ROOT_URL}/${API_ROUTE}?key=${API_KEY}`, databaseSafeCard);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to crate your card.", error);
	}
};

// Read
export const fetchPostFromApi = async (id, callback) => {
	try {
		const { data } = await axios.get(`${ROOT_URL}/${API_ROUTE}/${id}?key=${API_KEY}`);
		// console.log("data:", data);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to update your post.", error);
	}
};

export const fetchCardFromApi = async (id, callback) => {
	try {
		const { data } = await axios.get(`${ROOT_URL}/${API_ROUTE}/${id}?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to update your card.", error);
	}
};

// Update
export const updatePostFromApi = async (id, updatedFields, callback) => {
	try {
		const { data } = await axios.put(`${ROOT_URL}/${API_ROUTE}/${id}?key=${API_KEY}`, updatedFields);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to update your post.", error);
	}
};

// Delete
export const deletePostFromApi = async (id, callback) => {
	try {
		const { data } = await axios.delete(`${ROOT_URL}/${API_ROUTE}/${id}?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to delete your post.", error);
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
			attacks: ["Kick", "Punch"],
			height: dob.age,
			weight: dob.age * 2,
			weakness: getRandomFromArray(weaknesses),
			retreatCost: getRandomFromArray([1, 2, 3])
		}));
		// console.log("cards:", cards);
		return callback(cards);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to generate cards.", error);
	}
};

export const dropAllEntriesFromApi = (arrayOfIds) => arrayOfIds.forEach((id) => deletePostFromApi(id, () => console.log(`deleted entry with id: ${id}`)));
