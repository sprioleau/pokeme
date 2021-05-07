import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChakraProvider, extendTheme, Heading } from "@chakra-ui/react";
import { createCard, toggleModalVisibility } from "../store/actions";
import Form from "./NewCardForm";

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

	const customTheme = extendTheme({
		styles: {
			global: {
				body: {
					fontFamily: null,
					lineHeight: null,
					bg: null
				}
			}
		}
	});

	return (
		<div className="new-card">
			<ChakraProvider theme={customTheme}>
				<Heading as="h1" color="whiteAlpha.900" size="xl" textAlign="center">
					Create a PokéMe Card
				</Heading>
				<Form />
			</ChakraProvider>
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
