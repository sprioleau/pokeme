import React from "react";
import { ChakraProvider, extendTheme, Heading } from "@chakra-ui/react";
import NewCardForm from "./NewCardForm";

const NewCard = () => {
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
				<NewCardForm />
			</ChakraProvider>
		</div>
	);
};

export default NewCard;
