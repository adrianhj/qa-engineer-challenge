import React from "react";

type Schedule = {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyRepaymentAmount: number;
  totalInterestRepayable: number;
  totalAmountRepayable: number;
};

const useAmortisation = () => {
  const [schedule, setSchedule] = React.useState<Schedule | undefined>();

  const reset = () => setSchedule(undefined);

  const amortise = async (
    loanAmount: number,
    loanTerm: number,
    interestRate: number
  ) => {
    const monthlyInterestRateFactor = interestRate / 100 / 12;
    const monthlyRepaymentAmount =
      loanAmount *
      ((monthlyInterestRateFactor *
        Math.pow(1 + monthlyInterestRateFactor, loanTerm)) /
        (Math.pow(1 + monthlyInterestRateFactor, loanTerm) - 1));
    const totalInterestRepayable =
      monthlyRepaymentAmount * loanTerm - loanAmount;
    const totalAmountRepayable = loanAmount + totalInterestRepayable;

    setSchedule({
      loanAmount,
      loanTerm,
      interestRate,
      monthlyRepaymentAmount,
      totalInterestRepayable,
      totalAmountRepayable,
    });
  };

  return {
    schedule,
    reset,
    amortise,
  };
};

export { useAmortisation };
