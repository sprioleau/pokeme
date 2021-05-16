import React from "react";
import { Heading } from "@chakra-ui/react";
import EditCardForm from "./EditCardForm";
import ChakraWrapper from "./ChakraWrapper";

const EditCard = () => {
	return (
		<div className="new-card">
			<ChakraWrapper>
				<Heading as="h1" color="whiteAlpha.900" size="xl" textAlign="center">
					Edit PokéMe Card
				</Heading>
				<EditCardForm />
			</ChakraWrapper>
		</div>
	);
};

export default EditCard;
