import React from "react";
import { Heading } from "@chakra-ui/react";
import NewCardForm from "./NewCardForm";
import ChakraWrapper from "./ChakraWrapper";

const NewCard = () => {
	return (
		<div className="new-card">
			<ChakraWrapper>
				<Heading as="h1" color="whiteAlpha.900" size="xl" textAlign="center">
					Create a PokéMe Card
				</Heading>
				<NewCardForm />
			</ChakraWrapper>
		</div>
	);
};

export default NewCard;
