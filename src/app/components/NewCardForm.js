import React, { useState } from "react";
import {
  // ChakraProvider,
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
} from "@chakra-ui/react";
import moves from "../data/pokemon-moves";
import pokemonTypes from "../data/pokemon-types";
import { getRandomFromArray } from "../api/functions/api.functions";

const NewCardForm = () => {
  const formatFeet = (value) => `${value.toString()} ft.`;
  const formatInches = (value) => `${value.toString()} in.`;
  const formatWeight = (value) => `${value.toString()} lbs.`;

  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [type, setType] = useState(getRandomFromArray(pokemonTypes.slice(0, 5)));
  const [weakness, setWeakness] = useState(getRandomFromArray(pokemonTypes.slice(5, -1)));
  const [feet, setFeet] = useState(formatFeet(5));
  const [inches, setInches] = useState(formatInches(6));
  const [weight, setWeight] = useState(formatWeight(100));
  const [move1, setMove1] = useState(getRandomFromArray(moves.map((move) => move.name).slice(0, 5)));
  const [move2, setMove2] = useState(getRandomFromArray(moves.map((move) => move.name).slice(5, -1)));
  const [hitPoints, setHitPoints] = useState(100);
  const [nameHasBlurred, setNameHasBlurred] = useState(false);
  const [photoUrlHasBlurred, setPhotoUrlHasBlurred] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhotoUrlChange = (e) => setPhotoUrl(e.target.value);
  const handleSetType = (e) => setType(e.target.value);
  const handleSetWeakness = (e) => setWeakness(e.target.value);
  const handleFeetChange = (value) => setFeet(formatFeet(value));
  const handleInchesChange = (value) => setInches(formatInches(value));
  const handleWeightChange = (value) => setWeight(formatWeight(value));
  const handleSetMove1 = (e) => setMove1(e.target.value);
  const handleSetMove2 = (e) => setMove2(e.target.value);
  const handleHitPointsChange = (value) => setHitPoints(value);

  // Copied from: https://stackoverflow.com/questions/9714525/javascript-image-url-verify
  const checkPhotoInUrl = (url) => url.match(/\.(jpeg|jpg|gif|png)$/) !== null;

  const isValidUrl = checkPhotoInUrl(photoUrl);
  const isValidName = (userProvidedName) => userProvidedName.length > 2 && userProvidedName.length < 25;

  const handleNameFocus = () => setNameHasBlurred(false);
  const handleNameBlur = () => setNameHasBlurred(true);
  const handlePhotoUrlFocus = () => setPhotoUrlHasBlurred(false);
  const handlePhotoUrlBlur = () => setPhotoUrlHasBlurred(true);

  const isReadyToSubmit = name && photoUrl && type && weakness && feet && inches && weight && move1 && hitPoints;

  return (
    <Box
      backgroundColor="rgba(255,255,255, 0.9)"
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={650}
      p={6}
      m="10px auto"
      as="form"
      onSubmit={() => console.log("Submitting...")}
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
            <Select value={move1} onChange={handleSetMove1}>
            { moves.filter((move) => move.name !== move2).map((move) => <option key={move.name}>{move.name}</option>) }
            </Select>
          </FormControl>
          <FormControl id="move-2">
            <FormLabel>Second Move</FormLabel>
            <Select value={move2} onChange={handleSetMove2}>
            { moves.filter((move) => move.name !== move1).map((move) => <option key={move.name}>{move.name}</option>) }
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
        <Button disabled={!isReadyToSubmit} type="submit" colorScheme="blue" width="100%">Make my PokéMe</Button>
      </VStack>
    </Box>
  );
};

export default NewCardForm;
