import React from "react";
import { ChakraProvider, extendTheme, Heading } from "@chakra-ui/react";
import EditCardForm from "./EditCardForm";

const EditCard = () => {
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
					Edit PokéMe Card
				</Heading>
				<EditCardForm />
			</ChakraProvider>
		</div>
	);
};

export default EditCard;
