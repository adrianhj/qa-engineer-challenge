import { Table, Tbody, Td, Th, Tr } from "@chakra-ui/react";

const amountFormatter = Intl.NumberFormat("en", {
  style: "currency",
  currency: "GBP",
});

const formatAmount = (amount: number | undefined) =>
  typeof amount !== "undefined" ? amountFormatter.format(amount) : "-";

type LoanRepaymentDetailsProps = {
  monthlyRepaymentAmount?: number;
  totalInterestRepayable?: number;
  totalAmountRepayable?: number;
};

const LoanRepaymentDetails = ({
  monthlyRepaymentAmount,
  totalInterestRepayable,
  totalAmountRepayable,
}: LoanRepaymentDetailsProps) => {
  return (
    <Table>
      <Tbody>
        <Tr>
          <Th scope="row">Monthly Repayment Amount</Th>
          <Td isNumeric>{formatAmount(monthlyRepaymentAmount)}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Total Interest Repayable</Th>
          <Td isNumeric>{formatAmount(totalInterestRepayable)}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Total Amount Repayable</Th>
          <Td isNumeric>{formatAmount(totalAmountRepayable)}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export { LoanRepaymentDetails };
