import React from "react";

type Instalment = {
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

type Schedule = {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyRepaymentAmount: number;
  totalInterestRepayable: number;
  totalAmountRepayable: number;
  instalments: Instalment[];
};

const calculateMonthlyInterestRateFactor = (
  interestRate: number,
  periodsPerYear: number
): number => {
  return interestRate / 100 / periodsPerYear;
};

const calculateMonthlyRepaymentAmount = (
  loanAmount: number,
  loanTerm: number,
  balloonAmount: number,
  monthlyInterestRateFactor: number
): number => {
  return (
    (loanAmount -
      balloonAmount / Math.pow(1 + monthlyInterestRateFactor, loanTerm)) *
    (monthlyInterestRateFactor /
      (1 - Math.pow(1 + monthlyInterestRateFactor, -loanTerm)))
  );
};

const calculateInstalments = (
  loanAmount: number,
  loanTerm: number,
  monthlyInterestRateFactor: number,
  monthlyRepaymentAmount: number
): Instalment[] => {
  const instalments = [...Array.from(Array(loanTerm))].reduce(
    (instalmentsToDate: Instalment[], _, _period: number) => {
      const lastInstalment = instalmentsToDate[instalmentsToDate.length - 1];
      const interest = lastInstalment.balance * monthlyInterestRateFactor;
      const principal = monthlyRepaymentAmount - interest;
      const balance = lastInstalment.balance - principal;
      return [
        ...instalmentsToDate,
        {
          payment: monthlyRepaymentAmount,
          principal,
          interest,
          balance,
        },
      ];
    },
    [{ payment: 0, principal: 0, interest: 0, balance: loanAmount }]
  );
  instalments.shift();
  const finalBalance = instalments[instalments.length - 1].balance;

  // Floating-point math issues, good enough for challenge...
  if (finalBalance.toFixed(2) === "-0.00") {
    instalments[instalments.length - 1].balance = 0;
  }

  return instalments;
};

const useAmortisation = () => {
  const [schedule, setSchedule] = React.useState<Schedule | undefined>();

  const reset = () => setSchedule(undefined);

  const amortise = async (
    loanAmount: number,
    loanTerm: number,
    balloonAmount: number,
    interestRate: number
  ) => {
    // Oops, not sure what happened here, not very annual anymore after refactoring...
    const monthlyInterestRateFactor = calculateMonthlyInterestRateFactor(
      interestRate,
      loanTerm
    );
    const monthlyRepaymentAmount = calculateMonthlyRepaymentAmount(
      loanAmount,
      loanTerm,
      balloonAmount,
      monthlyInterestRateFactor
    );
    const totalInterestRepayable =
      monthlyRepaymentAmount * loanTerm + balloonAmount - loanAmount;
    const totalAmountRepayable = loanAmount + totalInterestRepayable;
    const instalments = calculateInstalments(
      loanAmount,
      loanTerm,
      monthlyInterestRateFactor,
      monthlyRepaymentAmount
    );
    setSchedule({
      loanAmount,
      loanTerm,
      interestRate,
      monthlyRepaymentAmount,
      totalInterestRepayable,
      totalAmountRepayable,
      instalments,
    });
  };

  return {
    schedule,
    reset,
    amortise,
  };
};

export { useAmortisation };
