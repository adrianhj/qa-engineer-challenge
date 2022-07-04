Feature: Loan Amortiser

  Background: User is accessing the Loan Amortiser
    Given the user is accessing the Loan Amortiser

  # Scenarios

  Scenario: User estimates monthly loan repayments for a 12 month term
    When the user estimates the monthly repayments for the following loan details:
      | Loan Amount   | 25000 |
      | Loan Term     | 12    |
      | Interest Rate | 4.67  |
    Then the user is presented with the following estimated repayment details:
      | Monthly Repayment Amount | 2,136.41  |
      | Total Interest Repayable | 636.90    |
      | Total Amount Repayable   | 25,636.90 |

  # Rules

  Rule: All required details must be provided

    Example: User does not provide the required details when estimating repayments
      When the user estimates the monthly repayments for the following loan details:
        | Loan Amount   |  |
        | Loan Term     |  |
        | Interest Rate |  |
      Then the user is presented with the following issues:
        | Loan Amount   | The amount of the loan must be provided        |
        | Loan Term     | The term of the loan must be provided          |
        | Interest Rate | The interest rate of the loan must be provided |
      And no repayment details are presented
