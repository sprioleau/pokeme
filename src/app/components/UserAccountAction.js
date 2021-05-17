import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link as ReactRouterLink } from "react-router-dom";
import { Heading, Button, Box, VStack, FormControl, FormLabel, Input, Text, Link } from "@chakra-ui/react";

import { signUpUser, signInUser } from "../store/actions";
import ChakraWrapper from "./ChakraWrapper";

const UserAccountAction = ({ action }) => {
  const [authorName, setAuthorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const fields = {
    signup: {
      heading: "Sign Up",
      link: {
        text: "Already have an account?",
        route: "/signin",
        linkText: "Sign In"
      },
      submitButtonText: "Sign Up",
      isReadyToSubmit: email && password && authorName,
      submitAction: () => dispatch(signUpUser({ email, password, authorName }, history))
    },
    signin: {
      heading: "Sign In",
      link: {
        text: "Need an account?",
        route: "/signup",
        linkText: "Sign Up"
      },
      submitButtonText: "Sign In",
      isReadyToSubmit: email && password,
      submitAction: () => dispatch(signInUser({ email, password }, history))
    },
  };

  const handleUpdateAuthorName = (e) => setAuthorName(e.target.value);
  const handleUpdateEmail = (e) => setEmail(e.target.value);
  const handleUpdatePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    fields[action].submitAction();
  };

  return (
    <div className="sign-up">
      <ChakraWrapper>
        <Heading as="h1" color="whiteAlpha.900" size="xl" textAlign="center">
          {fields[action].heading}
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
          onSubmit={handleSubmit}
        >
          <VStack spacing={4}>
            {action === "signup" && (
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name" value={authorName} onChange={handleUpdateAuthorName} />
              </FormControl>
            )}
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" value={email} onChange={handleUpdateEmail} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input placeholder="Password" value={password} type="password" onChange={handleUpdatePassword} />
            </FormControl>
            <Button disabled={!fields[action].isReadyToSubmit} type="submit" colorScheme="blue" width="100%">{fields[action].submitButtonText}</Button>
            <Text>{fields[action].link.text} <Link as={ReactRouterLink} to={fields[action].link.route}>{fields[action].link.linkText}</Link></Text>
          </VStack>
        </Box>
      </ChakraWrapper>
    </div>
  );
};

export default UserAccountAction;
