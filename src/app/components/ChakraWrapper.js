import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const ChakraWrapper = ({ children }) => {
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
    <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
  );
};

export default ChakraWrapper;
