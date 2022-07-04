import { DataTable } from "@cucumber/cucumber";

class LoanAmortiserPage {
  async open() {
    await browser.url("/");
  }

  get calculateButton() {
    return $("button=Calculate");
  }

  get loanRepaymentDetailsTable() {
    return $("//table[caption='Loan Repayment Details']");
  }

  async populateForm(values: DataTable) {
    for (const [labelText, value] of Object.entries(values.rowsHash())) {
      const label = $(`label=${labelText}`);
      await $(`#${await label.getAttribute("for")}`).setValue(value);
    }
  }

  async submit() {
    await this.calculateButton.click();
  }
}

export default new LoanAmortiserPage();
