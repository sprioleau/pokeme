import React, { useState } from "react";
import {
  Box,
  VStack,
	HStack,
	Heading,
  FormControl,
  FormLabel,
  Select,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import moves from "../../data/pokemon-moves";
import pokemonTypes from "../../data/pokemon-types";
import ChakraWrapper from "../ChakraWrapper";
import { getRandomFromArray } from "../../api/functions/api.functions";
import { createCard, toggleModalVisibility } from "../../store/actions/index";
import Pong from "../Pong";

const NewCard = () => {
	const formatFeet = (value) => `${value.toString()} ft.`;
  const formatInches = (value) => `${value.toString()} in.`;
  const formatWeight = (value) => `${value.toString()} lbs.`;

  const dispatch = useDispatch();
  const history = useHistory();

	const [formFields, setFormFields] = useState({
		name: "",
		photoUrl: "",
		type: getRandomFromArray(pokemonTypes.slice(0, 5)),
		weakness: getRandomFromArray(pokemonTypes.slice(5, pokemonTypes.length)),
		height: {
			feet: formatFeet(5),
			inches: formatInches(6),
		},
		weight: formatWeight(100),
		attacks: {
			move1: getRandomFromArray(moves),
			move2: {}
		},
		hitPoints: 100,
		message: "",
		isSpecial: false,
		showSpecial: true,
	});

  const [nameHasBlurred, setNameHasBlurred] = useState(false);
  const [photoUrlHasBlurred, setPhotoUrlHasBlurred] = useState(false);

  const handleNameChange = (e) => setFormFields({ ...formFields, name: e.target.value });
  const handlePhotoUrlChange = (e) => setFormFields({ ...formFields, photoUrl: e.target.value });
  const handleSetType = (e) => setFormFields({ ...formFields, type: e.target.value });
  const handleSetWeakness = (e) => setFormFields({ ...formFields, weakness: e.target.value });
  const handleFeetChange = (value) => setFormFields({ ...formFields, height: { ...formFields.height, feet: formatFeet(value) } });
  const handleInchesChange = (value) => setFormFields({ ...formFields, height: { ...formFields.height, inches: formatInches(value) } });
  const handleWeightChange = (value) => setFormFields({ ...formFields, weight: formatWeight(value) });
	const handleSetMove1 = (e) => setFormFields({ ...formFields, attacks: { ...formFields.attacks, move1: moves.find((move) => move.name === e.target.value) } });
	const handleSetMove2 = (e) => setFormFields({ ...formFields, attacks: { ...formFields.attacks, move2: moves.find((move) => move.name === e.target.value) } });
  const handleHitPointsChange = (value) => setFormFields({ ...formFields, hitPoints: value });
	const handleMessageChange = (e) => setFormFields({ ...formFields, message: e.target.value });

  // Copied from: https://stackoverflow.com/questions/9714525/javascript-image-url-verify
  const checkPhotoInUrl = (url) => url.match(/\.(jpeg|jpg|gif|png)$/) !== null;

  const isValidUrl = checkPhotoInUrl(formFields.photoUrl);
  const isValidName = (userProvidedName) => userProvidedName.length > 2 && userProvidedName.length < 25;

  const handleNameFocus = () => setNameHasBlurred(false);
  const handleNameBlur = () => setNameHasBlurred(true);
  const handlePhotoUrlFocus = () => setPhotoUrlHasBlurred(false);
  const handlePhotoUrlBlur = () => setPhotoUrlHasBlurred(true);
  const toggleIsSpecial = () => {
    const toastDuration = 3000;
		setFormFields({ ...formFields, isSpecial: true });
    toast("Pika! Glass material applied.", { autoClose: toastDuration });
    setTimeout(() => setFormFields({ ...formFields, showSpecial: false }), toastDuration);
  };

	const handleCloseModal = () => dispatch(toggleModalVisibility({}));

	const { name, photoUrl, type, weakness, weight, hitPoints, message, attacks, height: { feet, inches } } = formFields;

  const isReadyToSubmit = name && photoUrl && type && weakness && feet && inches && weight && hitPoints && attacks.move1;

	const ready = { name, photoUrl, type, weakness, feet, inches, weight, hitPoints, move1: attacks.move1 };
	console.log("ready:", ready);

	// Adapted from: https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
	// This function removes move2 from the attacks object if it is null (unset by the user)
	const cleanAttacks = (attacksObject) => {
		const copy = attacksObject;
		for (const key in copy) {
			if (copy[key] === null) delete copy[key];
		}
		return copy;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

    const newCard = {
			...formFields,
			height: {
				ft: formFields.height.feet.replace(" ft.", ""),
				in: formFields.height.inches.replace(" in.", ""),
			},
			attacks: cleanAttacks(attacks),
			weight: formFields.weight.replace(" lbs.", ""),
			retreatCost: getRandomFromArray([1, 2, 3]),
      description: "A lovely PokéMe with an exceptional personality.",
		};

    dispatch(createCard(newCard, history));
	};

	return (
		<div className="new-card">
			<ChakraWrapper>
				<Heading as="h1" color="whiteAlpha.900" size="xl" textAlign="center">
					Create a PokéMe Card
				</Heading>
				<Pong isSelected={formFields.isSpecial} onClick={toggleIsSpecial} show={formFields.showSpecial} src="../images/pikachu.png" alt="Pikachu" />
				<Box
					backgroundColor="#fff"
					borderWidth="1px"
					rounded="lg"
					shadow="1px 1px 3px rgba(0,0,0,0.3)"
					maxWidth={650}
					p={6}
					m="10px auto"
					as="form"
					onSubmit={handleSubmit}
				>
					<VStack spacing={4}>
						<FormControl isRequired id="name" onFocus={handleNameFocus} onBlur={handleNameBlur} isInvalid={nameHasBlurred && !isValidName(name)}>
							<FormLabel>Name</FormLabel>
							<Input variant="outline" placeholder="Pikachu" value={name} onChange={handleNameChange} />
						</FormControl>
						<FormControl isRequired id="photo-url" onFocus={handlePhotoUrlFocus} onBlur={handlePhotoUrlBlur} isInvalid={photoUrlHasBlurred && !isValidUrl}>
							<FormLabel>Image URL</FormLabel>
							<Input variant="outline" placeholder="https://www.example.com/images/photo-of-me.png" value={photoUrl} onChange={handlePhotoUrlChange} />
						</FormControl>
						<HStack width="100%">
							<FormControl isRequired id="type">
								<FormLabel>Type</FormLabel>
								<Select value={type} onChange={handleSetType}>
								{ pokemonTypes.map((pokemonType) => <option key={pokemonType}>{pokemonType}</option>) }
								</Select>
							</FormControl>
							<FormControl isRequired id="weakness">
								<FormLabel>Weakness</FormLabel>
								<Select value={weakness} onChange={handleSetWeakness}>
								{ pokemonTypes.filter((pokemonType) => pokemonType !== type).map((pokemonType) => <option key={pokemonType}>{pokemonType}</option>) }
								</Select>
							</FormControl>
						</HStack>
						<HStack width="100%">
							<FormControl isRequired id="length">
								<FormLabel>Length</FormLabel>
								<HStack>
									<NumberInput maxW={20} step={1} defaultValue={5} value={feet} min={2} max={8} pattern="[0-9]\sft." onChange={(value) => handleFeetChange(value)}>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
									<NumberInput maxW={20} step={1} defaultValue={6} value={inches} min={0} max={11} pattern="[0-9]\sin." onChange={(value) => handleInchesChange(value)}>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</HStack>
							</FormControl>
							<FormControl isRequired id="weight">
								<FormLabel>Weight</FormLabel>
								<NumberInput width={28} step={10} defaultValue={100} value={weight} min={2} max={1000} pattern="[0-9]*(.[0-9]+)?\slbs." onChange={(value) => handleWeightChange(value)}>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</FormControl>
						</HStack>
						<HStack width="100%">
							<FormControl isRequired id="move-1">
								<FormLabel>First Move</FormLabel>
								<Select value={attacks.move1.name} onChange={handleSetMove1}>
								{ moves.filter((move) => move.name !== attacks.move1.name).map((move) => <option key={move.name}>{move.name}</option>) }
								</Select>
							</FormControl>
							<FormControl id="move-2">
								<FormLabel>Second Move</FormLabel>
								<Select placeholder="Select a second move" value={attacks.move2?.name} onChange={handleSetMove2}>
								{ moves.filter((move) => move.name !== attacks.move1.name).map((move) => <option key={move.name}>{move.name}</option>) }
								</Select>
							</FormControl>
						</HStack>
						<FormControl isRequired id="hit-points">
							<FormLabel>Hit Points</FormLabel>
							<Slider flex="1" max={200} min={50} defaultValue={100} step={10} focusThumbOnChange={false} value={hitPoints} onChange={(value) => handleHitPointsChange(value)}>
								<SliderTrack bg="red.100">
									<SliderFilledTrack bg="tomato" />
								</SliderTrack>
								<SliderThumb fontSize="sm" boxSize="32px">
									{hitPoints}
								</SliderThumb>
							</Slider>
						</FormControl>
						<FormControl id="message">
							<FormLabel>Message</FormLabel>
							<Textarea value={message} placeholder="Enter additional deets (supports Markdown)..." onChange={handleMessageChange} />
						</FormControl>
						<HStack width="100%">
							<Button disabled={!isReadyToSubmit} type="submit" colorScheme="blue" width="100%">Make my PokéMe</Button>
							<Button type="button" colorScheme="blue" variant="outline" width="100%" onClick={handleCloseModal}>Close</Button>
						</HStack>
					</VStack>
				</Box>
			</ChakraWrapper>
		</div>
	);
};

export default NewCard;
