import { ChakraProvider, Container, extendTheme, Flex } from "@chakra-ui/react";
import { LoanCalculator } from "./components/LoanCalculator";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <Container marginY={6}>
          <LoanCalculator />
        </Container>
      </Flex>
    </ChakraProvider>
  );
};

export { App };
