import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

const LoanCalculatorForm = () => {
  return (
    <form>
      <Grid gap={3}>
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="loanAmount">Loan Amount</FormLabel>
            <NumberInput id="loanAmount" defaultValue={25000}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="loanTerm">Loan Term</FormLabel>
            <NumberInput id="loanTerm" defaultValue={12}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="interestRate">Interest Rate</FormLabel>
            <NumberInput id="interestRate" defaultValue={5}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem>
          <Box display="flex" justifyContent="center">
            <Button colorScheme="teal">Calculate</Button>
          </Box>
        </GridItem>
      </Grid>
    </form>
  );
};

export { LoanCalculatorForm };
