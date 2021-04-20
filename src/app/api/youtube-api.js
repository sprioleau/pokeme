import axios from "axios";
import staticVideos from "../data/videos";

const API_URL = "https://www.googleapis.com/youtube/v3/search";

const youtubeSearch = (term) => {
	const params = {
		part: "snippet",
		key: process.env.REACT_APP_API_KEY,
		q: term,
		type: "video",
		maxResults: 10,
		safeSearch: "moderate",
	};

	if (process.env.NODE_ENV === "development") {
		return new Promise((resolve) => {
			console.log(
				"%cVideos data from static file during development.",
				// eslint-disable-next-line comma-dangle
				"background: blue; color: #fff; padding: 5px; font-size: 18px"
			);
			resolve(staticVideos);
		});
	}

	return new Promise((resolve, reject) => {
		axios
			.get(API_URL, { params })
			.then((response) => {
				resolve(response.data.items);
			})
			.catch((error) => {
				console.log(`Error with YouTube API: ${error}`);
				reject(error);
			});
	});
};

export default youtubeSearch;
