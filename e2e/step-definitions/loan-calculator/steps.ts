import { DataTable, Given, Then, When } from "@wdio/cucumber-framework";
import LoanAmortiserPage from "pages/loan-amortiser";

Given(/^the user is accessing the Loan Amortiser$/, async () => {
  await LoanAmortiserPage.open();
  await LoanAmortiserPage.calculateButton.waitForDisplayed();
});

When(
  /^the user estimates the monthly repayments for the following loan details:$/,
  async (table: DataTable) => {
    await LoanAmortiserPage.populateForm(table);
    await LoanAmortiserPage.submit();
  }
);

Then(
  /^the user is presented with the following issues:$/,
  async (table: DataTable) => {
    for (const [key, value] of Object.entries(table.rowsHash())) {
      const label = $(`label=${key}`);
      const input = $(`#${await label.getAttribute("for")}`);
      const error = $(`#${await input.getAttribute("aria-describedby")}`);

      await expect(input).toHaveAttribute("aria-invalid", "true");
      await expect(error).toHaveText(value);
    }
  }
);

Then(
  /^the user is presented with the following estimated repayment details:$/,
  async (table: DataTable) => {
    await expect(
      LoanAmortiserPage.loanRepaymentDetailsTable.$("tbody")
    ).toHaveChildren(3);

    for (const [i, [key, value]] of Object.entries(
      table.rowsHash()
    ).entries()) {
      await expect(
        LoanAmortiserPage.loanRepaymentDetailsTable.$(
          `[role=row]:nth-child(${i + 1}) th`
        )
      ).toHaveText(new RegExp(key, "i"));
      await expect(
        LoanAmortiserPage.loanRepaymentDetailsTable.$(
          `[role=row]:nth-child(${i + 1}) td`
        )
      ).toHaveText(value);
    }
  }
);

Then(/^no repayment details are presented$/, async () => {
  await expect(LoanAmortiserPage.loanRepaymentDetailsTable).not.toBeDisplayed();
});
