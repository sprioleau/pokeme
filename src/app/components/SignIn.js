import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link as ReactRouterLink } from "react-router-dom";
import { Heading, Button, Box, VStack, FormControl, FormLabel, Input, Text, Link } from "@chakra-ui/react";
import { signInUser } from "../store/actions/index";
import ChakraWrapper from "./ChakraWrapper";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUpdateEmail = (e) => setEmail(e.target.value);
  const handleUpdatePassword = (e) => setPassword(e.target.value);
  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }, history));
  };

  const isReadyToSubmit = email && password;

  return (
    <div className="sign-in">
      <ChakraWrapper>
        <Heading as="h1" color="whiteAlpha.900" size="xl" textAlign="center">
					Sign In
        </Heading>
        <Box
          backgroundColor="#fff"
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={450}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSignIn}
        >
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" value={email} onChange={handleUpdateEmail} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input placeholder="Password" value={password} type="password" onChange={handleUpdatePassword} />
            </FormControl>
            <Button disabled={!isReadyToSubmit} type="submit" colorScheme="blue" width="100%">Sign In</Button>
            <Text>Need an account? <Link as={ReactRouterLink} to="/signup">Sign up</Link></Text>
          </VStack>
        </Box>
      </ChakraWrapper>
    </div>
  );
};

export default SignIn;
