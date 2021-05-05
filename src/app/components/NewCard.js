import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCard, toggleModalVisibility } from "../store/actions";

const NewCard = () => {
	const [content, setContent] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();

	const handleContentChange = (e) => setContent(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newCard = { content };
		dispatch(createCard(newCard, history));
	};

	const handleCloseModal = () => dispatch(toggleModalVisibility());

	return (
		<div className="new-card">
			<form className="new-card__form" onSubmit={(e) => e.preventDefault()}>
				<fieldset className="new-card__group">
					<legend className="new-card__legend">Create a new card</legend>
					<p className="new-card__input content">
						<label htmlFor="content">Content:	<input type="text" id="content" name="content" value={content} onChange={handleContentChange} /></label>
					</p>
				<button type="submit" className="new-card__button btn" onClick={handleSubmit}>Create Card</button>
				<button type="button" className="new-card__button btn" onClick={handleCloseModal}>Close</button>
				</fieldset>
			</form>
		</div>
	);
};

export default NewCard;
