import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { formatAmount } from "src/util/format-amount";

type Instalment = {
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

type LoanRepaymentScheduleProps = {
  instalments: Instalment[];
};

const LoanRepaymentSchedule = ({ instalments }: LoanRepaymentScheduleProps) => {
  return (
    <TableContainer>
      <Table>
        <TableCaption placement="top">Loan Repayment Schedule</TableCaption>
        <Thead>
          <Tr>
            <Th>Instalment</Th>
            <Th isNumeric>Payment</Th>
            <Th isNumeric>Principal</Th>
            <Th isNumeric>Interest</Th>
            <Th isNumeric>Balance</Th>
          </Tr>
        </Thead>
        <Tbody sx={{ "tr:last-child > *": { borderBottom: 0 } }}>
          {instalments.map((instalment, index) => (
            <Tr key={index + 1}>
              <Td>{index + 1}</Td>
              <Td isNumeric>{formatAmount(instalment.payment)}</Td>
              <Td isNumeric>{formatAmount(instalment.principal)}</Td>
              <Td isNumeric>{formatAmount(instalment.interest)}</Td>
              <Td isNumeric>{formatAmount(instalment.balance)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { LoanRepaymentSchedule };
