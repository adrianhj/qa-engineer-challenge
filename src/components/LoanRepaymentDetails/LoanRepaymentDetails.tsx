import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";

type LoanRepaymentDetailsProps = {
  monthlyRepaymentAmount?: number;
  totalInterestRepayable?: number;
  totalAmountRepayable?: number;
};

const amountFormatter = Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const formatAmount = (amount: number | undefined) =>
  typeof amount !== "undefined" ? amountFormatter.format(amount) : "-";

const LoanRepaymentDetails = ({
  monthlyRepaymentAmount,
  totalInterestRepayable,
  totalAmountRepayable,
}: LoanRepaymentDetailsProps) => {
  return (
    <TableContainer>
      <Table>
        <TableCaption placement="top">Loan Repayment Details</TableCaption>
        <Tbody sx={{ "tr:last-child > *": { borderBottom: 0 } }}>
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
    </TableContainer>
  );
};

export { LoanRepaymentDetails };
