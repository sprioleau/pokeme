import axios from "axios";
import { getName, types, weaknesses, getRandomFromArray } from "./functions";

const ROOT_URL = "https://platform.cs52.me/api";
const API_KEY = "s_prioleau";

// eslint-disable-next-line
export const fetchPosts = async (callback) => {
	try {
		const { data } = await axios.get(`${ROOT_URL}/posts?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! We got an error when trying to load your posts.", error);
	}
};

// Create
export const createPost = async (post, callback) => {
	try {
		const { data } = await axios.post(`${ROOT_URL}/posts?key=${API_KEY}`, post);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to crate your post.", error);
	}
};

// Read
export const fetchPost = async (id, callback) => {
	try {
		const { data } = await axios.get(`${ROOT_URL}/posts/${id}?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to update your post.", error);
	}
};

// Update
export const updatePost = async (id, updatedFields, callback) => {
	try {
		const { data } = await axios.put(`${ROOT_URL}/posts/${id}?key=${API_KEY}`, updatedFields);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to update your post.", error);
	}
};

// Delete
export const deletePost = async (id, callback) => {
	try {
		const { data } = await axios.delete(`${ROOT_URL}/posts/${id}?key=${API_KEY}`);
		return callback(data);
	} catch (error) {
		return console.error("🔴 Uh oh! There was an error when trying to deletee your post.", error);
	}
};

export const generateCards = async (quantity, callback) => {
	try {
		const { data } = await axios.get(`https://randomuser.me/api/?results=${quantity}`);
		const cards = data.results.map(({ name, picture, dob, login }) => ({
			id: login.uuid,
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
