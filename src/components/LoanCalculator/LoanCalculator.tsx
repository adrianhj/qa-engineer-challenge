import { Box } from "@chakra-ui/react";
import { LoanCalculatorForm } from "../LoanCalculatorForm";

const LoanCalculator = () => {
  return (
    <Box
      paddingX={6}
      paddingY={4}
      shadow="lg"
      rounded="md"
      bg="white"
      borderBottom={1}
    >
      <LoanCalculatorForm />
    </Box>
  );
};

export { LoanCalculator };
