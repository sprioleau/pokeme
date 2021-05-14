import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
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
  Textarea
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import moves from "../data/pokemon-moves";
import pokemonTypes from "../data/pokemon-types";
import { getRandomFromArray } from "../api/functions/api.functions";
import { toggleModalVisibility, updateCard } from "../store/actions/index";
import { selectCurrentCard } from "../store/selectors/index";

const EditCardForm = () => {
  const currentCard = useSelector(selectCurrentCard);
  const { id } = currentCard;
  const history = useHistory();

  const formatFeet = (value) => `${value.toString()} ft.`;
  const formatInches = (value) => `${value.toString()} in.`;
  const formatWeight = (value) => `${value.toString()} lbs.`;

  const dispatch = useDispatch();

  const secondMove = currentCard.attacks[1] ? currentCard.attacks[1] : {};

  const [name, setName] = useState(currentCard.name);
  const [photoUrl, setPhotoUrl] = useState(currentCard.photoUrl);
  const [type, setType] = useState(currentCard.type);
  const [weakness, setWeakness] = useState(currentCard.weakness);
  const [feet, setFeet] = useState(`${currentCard.height.ft} ft.`);
  const [inches, setInches] = useState(`${currentCard.height.ft} in.`);
  const [weight, setWeight] = useState(`${currentCard.height.ft} lbs.`);
  const [move1, setMove1] = useState(currentCard.attacks[0]);
  const [move2, setMove2] = useState(secondMove);
  const [hitPoints, setHitPoints] = useState(currentCard.hitPoints);
  const [message, setMessage] = useState(currentCard.message);

  const [nameHasBlurred, setNameHasBlurred] = useState(false);
  const [photoUrlHasBlurred, setPhotoUrlHasBlurred] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhotoUrlChange = (e) => setPhotoUrl(e.target.value);
  const handleSetType = (e) => setType(e.target.value);
  const handleSetWeakness = (e) => setWeakness(e.target.value);
  const handleFeetChange = (value) => setFeet(formatFeet(value));
  const handleInchesChange = (value) => setInches(formatInches(value));
  const handleWeightChange = (value) => setWeight(formatWeight(value));
  const handleSetMove1 = (e) => setMove1(moves.find((move) => move.name === e.target.value));
  const handleSetMove2 = (e) => setMove2(moves.find((move) => move.name === e.target.value));
  const handleHitPointsChange = (value) => setHitPoints(value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  // Copied from: https://stackoverflow.com/questions/9714525/javascript-image-url-verify
  const checkPhotoInUrl = (url) => url.match(/\.(jpeg|jpg|gif|png)$/) !== null;

  const isValidUrl = checkPhotoInUrl(photoUrl);
  const isValidName = (userProvidedName) => userProvidedName.length > 2 && userProvidedName.length < 15;

  const handleNameFocus = () => setNameHasBlurred(false);
  const handleNameBlur = () => setNameHasBlurred(true);
  const handlePhotoUrlFocus = () => setPhotoUrlHasBlurred(false);
  const handlePhotoUrlBlur = () => setPhotoUrlHasBlurred(true);

  const isReadyToSubmit = name && photoUrl && type && weakness && feet && inches && weight && move1 && hitPoints;

  const handleCloseModal = () => dispatch(toggleModalVisibility({}));

  const attacks = Object.keys(move2).length > 0 ? [move1, move2] : [move1];

  const handleSubmit = (e) => {
		e.preventDefault();
    const newCard = {
      name,
			photoUrl,
			type,
      attacks,
			hitPoints,
			height: {
				ft: parseInt(feet.replace(" ft.", ""), 10),
				in: parseInt(inches.replace(" in.", ""), 10),
			},
			weight: parseInt(weight.replace(" lbs.", ""), 10),
			weakness,
			retreatCost: getRandomFromArray([1, 2, 3]),
      description: "A lovely PokéMe with an exceptional personality.",
      message
    };
    dispatch(updateCard(id, newCard, history));
	};

  return (
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
            <Select value={move1.name} onChange={handleSetMove1}>
            { moves.filter((move) => move.name !== move2.name).map((move) => <option key={move.name}>{move.name}</option>) }
            </Select>
          </FormControl>
          <FormControl id="move-2">
            <FormLabel>Second Move</FormLabel>
            <Select placeholder="Select a second move" value={move2?.name} onChange={handleSetMove2}>
            { moves.filter((move) => move.name !== move1.name).map((move) => <option key={move.name}>{move.name}</option>) }
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
          <Button disabled={!isReadyToSubmit} type="submit" colorScheme="blue" width="100%">Update PokéMe Card</Button>
          <Button type="button" colorScheme="blue" variant="outline" width="100%" onClick={handleCloseModal}>Cancel</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default EditCardForm;
