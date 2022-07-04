import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

type LoanCalculatorFormValues = {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  balloonAmount: number;
};

const defaultValues = {
  loanAmount: 30000,
  loanTerm: 12,
  interestRate: 7.5,
  balloonAmount: 0,
};

type LoanCalculatorFormProps = {
  onSubmit(formData: LoanCalculatorFormValues): void;
  onReset?(): void;
};

const LoanCalculatorForm = ({ onSubmit, onReset }: LoanCalculatorFormProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoanCalculatorFormValues>({
    defaultValues,
  });

  const handleSubmitWithDelay = async (formData: LoanCalculatorFormValues) => {
    onSubmit(
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(formData);
        }, Math.floor(Math.random() * (2500 - 500 + 1)) + 500)
      )
    );
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset(defaultValues);
    onReset && onReset();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitWithDelay)} noValidate>
      <Grid gap={3}>
        <GridItem>
          <FormControl
            isInvalid={Boolean(errors.loanAmount)}
            isDisabled={isSubmitSuccessful}
          >
            <FormLabel htmlFor="loanAmount">Loan Amount</FormLabel>
            <Input
              id="loanAmount"
              type="number"
              {...register("loanAmount", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "The amount of the loan must be provided",
                },
                min: {
                  value: 1,
                  message: "The amount of the loan must be greater than 0",
                },
                validate: (amount) =>
                  /^\d+$/.test(String(amount)) ||
                  "The amount of the loan must be a whole number",
              })}
            />
            <FormErrorMessage>{errors.loanAmount?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl
            isInvalid={Boolean(errors.loanTerm)}
            isDisabled={isSubmitSuccessful}
          >
            <FormLabel htmlFor="loanTerm">Loan Term</FormLabel>
            <Input
              id="loanTerm"
              type="number"
              {...register("loanTerm", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "The term of the loan must be provided",
                },
                min: {
                  value: 1,
                  message: "The term of the loan must be greater than 0",
                },
                validate: (term) =>
                  /^\d+$/.test(String(term)) ||
                  "The term of the loan must be a whole number",
              })}
            />
            <FormErrorMessage>{errors.loanTerm?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl
            isInvalid={Boolean(errors.interestRate)}
            isDisabled={isSubmitSuccessful}
          >
            <FormLabel htmlFor="interestRate">Interest Rate</FormLabel>
            <Input
              id="interestRate"
              type="number"
              {...register("interestRate", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "The interest rate of the loan must be provided",
                },
                min: {
                  value: 0,
                  message:
                    "The interest rate of the loan must be greater than 0",
                },
              })}
            />
            <FormErrorMessage>{errors.interestRate?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl
            isInvalid={Boolean(errors.balloonAmount)}
            isDisabled={isSubmitSuccessful}
          >
            <FormLabel htmlFor="balloonAmount">Balloon Amount</FormLabel>
            <Input
              id="balloonAmount"
              type="number"
              {...register("balloonAmount", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "The balloon amount must be provided",
                },
                min: {
                  value: 0,
                  message: "The balloon amount must be a positive amount",
                },
                validate: (term) =>
                  /^\d+$/.test(String(term)) ||
                  "The balloon amount must be a whole number",
              })}
            />
            <FormErrorMessage>{errors.balloonAmount?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <Box display="flex" justifyContent="center">
            {isSubmitSuccessful ? (
              <Button colorScheme="gray" onClick={handleReset}>
                Reset
              </Button>
            ) : (
              <Button
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Calculating"
              >
                Calculate
              </Button>
            )}
          </Box>
        </GridItem>
      </Grid>
    </form>
  );
};

export { LoanCalculatorForm };
export type { LoanCalculatorFormValues };
