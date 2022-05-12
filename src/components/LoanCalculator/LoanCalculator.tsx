import { Grid, GridItem } from "@chakra-ui/react";
import { useAmortisation } from "../../hooks/use-amortisation";
import { LoanCalculatorForm } from "../LoanCalculatorForm";
import { LoanCalculatorFormValues } from "../LoanCalculatorForm/LoanCalculatorForm";
import { LoanRepaymentDetails } from "../LoanRepaymentDetails";
import { LoanSchedule } from "../LoanSchedule";

const LoanCalculator = () => {
  const { schedule, reset, amortise } = useAmortisation();

  const handleSubmit = (formData: LoanCalculatorFormValues) => {
    amortise(formData.loanAmount, formData.loanTerm, formData.interestRate);
  };

  return (
    <Grid gap={6}>
      <GridItem
        paddingX={6}
        paddingY={4}
        shadow="md"
        rounded="md"
        bg="white"
        borderBottom={1}
      >
        <LoanCalculatorForm onSubmit={handleSubmit} onReset={reset} />
      </GridItem>
      {schedule && (
        <GridItem
          paddingX={6}
          paddingY={4}
          shadow="md"
          rounded="md"
          bg="white"
          borderBottom={1}
        >
          <LoanRepaymentDetails {...schedule} />
        </GridItem>
      )}
      {schedule && (
        <GridItem
          paddingX={6}
          paddingY={4}
          shadow="md"
          rounded="md"
          bg="white"
          borderBottom={1}
        >
          <LoanSchedule instalments={schedule.instalments} />
        </GridItem>
      )}
    </Grid>
  );
};

export { LoanCalculator };
