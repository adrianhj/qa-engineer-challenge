# QA Engineer Challenge

```
TIMEBOX: 3-4 hours
STACK: TypeScript/WebdriverIO/Gherkin (via CucumberJS)
```

## Overview

This challenge is to extend the existing browser automation suite for the provided React application.

It is important to note that this is by no means a test with a single correct
answer in terms of structure and code, we are hoping to get an understanding of how you communicate
expectations around behaviour in software, as well as how you go about validating these
behaviours using developed automation tests.

You will find the current end-to-end suite set-up using [WebdriverIO](https://webdriver.io/)
in the `e2e` directory, with an existing scenario and rule as a starting point for the challenge.

## The Challenge

Using the provided application (documented in more detail below), enhance the suite by:

- Extending the existing scenario to validate the generated Loan Repayment Schedule
- Extending the suite to validate the calculated Loan Repayment Details for the following variations:

  | Loan Amount | Loan Term | Interest Rate | Balloon Amount |
  | ----------- | --------- | ------------- | -------------- |
  | 30000       | 24        | 7.4           | 0              |
  | 35000       | 12        | 6.34          | 5000           |
  | 40000       | 36        | 3.75          | 10000          |

For any issues or perceived issues found, either:

- Add failing tests to the suite; or
- Document these alongside your submission depending on whether you feel this is behaviour
  which should be asserted on or not as part of the suite.

## Submitting the Challenge

- Please submit your challenge as a git repository.
- You can either:
  - Create a repository on your preferred git hosting provider and share a link (e.g. GitHub, GitLab, BitBucket) ; or
  - Send the whole repository, zipped (including the .git directory!
  - (Please do not fork this repository directly!)
- Feel free to include any supporting materials used to support the validation of the challenge

## Running the Application

### Pre-requisites to Run the Application

- Node 16; or alternatively Docker using the provided Dockerfile

### Starting the Application

1. Ensure the project's dependencies are installed using `npm install`
2. Launch the application using `npm run start`

Once started you will be able to access the application at
[http://localhost:3000](http://localhost:3000).

## Running the WebdriverIO Suite

### Pre-requisites

- Node 16
- Google Chrome (you are able to configure a different browser in the
  `./e2e/wdio.conf.ts` file if you prefer)
- Application running on http://localhost:3000 using steps above

### Running the Suite

1. Ensure the project's dependencies are installed using `npm install`
2. Run the suite using `npm run e2e`

## The Loan Amortiser Application

If you are not familiar with the term already, amortisation is the process of paying
off a loan over time via regular payments. A portion of each payment is for the
interest, whilst the remainder is applied towards the principal balance (the initial
size of the loan); mortgages are typically amortising loans.

The Loan Amortiser provides a basic calculator to calculate the instalment schedule of a
loan given an amount, a term (in months), an annual interest rate, and a balloon amount
(a lump sum payment to be made at the end of the term, resulting in smaller regular payments).

Using these inputs, the calculator derives the following:

- The monthly repayment amount using the logic outlined below
- The total interest repayable based on the difference between the loan amount and
  the total amount due
- The total amount repayable as the loan amount plus the interest repayable

As well as the full schedule, detailing each repayment over the term of the loan.

There are various methods of amortising a loan, our calculator implements the
[Annuity Method](https://en.wikipedia.org/wiki/Amortization_schedule#Annuity_method)
whereby each payment is the same with a decreasing interest payment and increasing
principal payment over time.

### Calculating the Monthly Repayment Amount

#### Without a Balloon Payment

The monthly repayment without a balloon payment can be calculated using the following
formula:

```
Monthly Repayment = P * ((r * (1 + r) ^ n) / ((1 + r) ^ n - 1))
```

Where:

- `P` is the amount of the loan (e.g. £20000)
- `r` is the yearly interest rate (as a decimal) divided by 12 as we're repaying
  monthly (e.g. 0.075 / 12 = 0.00625)
- `n` is the total number of payments to be made (e.g. 12)

e.g.

```
£1735.15 = £20,000 * ((0.00625 * (1 + 0.00625) ^ 12) / ((1 + 0.00625) ^ 12 - 1))
```

#### With a Balloon Payment

The monthly repayment with a balloon payment can be calculated using the following
formula:

```
Monthly Repayment = (P - (B / ((1 + r) ^ n))) * (r / (1 - (1 + r) ^ -n))
```

Where:

- `P` is the amount of the loan (e.g. £20000)
- `B` is the balloon payment to be made at the end (e.g. £10,000)
- `r` is the yearly interest rate (as a decimal) divided by 12 as we're repaying
  monthly (e.g. 0.075 / 12 = 0.00625)
- `n` is the total number of payments to be made (e.g. 12)

e.g.

```
£930.07 = (£20,000 - (£10,000 / ((1 + 0.00625) ^ 12)))
          * (0.00625 / (1 - (1 + 0.00625) ^ -12))
```

This main set of logic is implemented in the
[useAmortisation](./src/hooks/use-amortisation/useAmortisation.ts) hook.

#### Building the Amortisation Schedule

To build out our schedule we need to step through each scheduled payment
("instalment") and apportion it to the principal (the original amount owed or
remaining amount thereof in each period) and interest due as appropriate, calculating
the remaining balance after each payment as input to the next period.

##### Calculating the Interest Portion

To apportion the interest part of the payment apply the following formula:

```
Interest = P * r
```

Where:

- `P` is the remaining balance
- `i` is the periodic interest (yearly interest as a decimal / 12 as before)

e.g.

```
£125 = £20,000 * 0.00625
```

##### Calculating the Principal Portion

Whilst there is no direct way to work out the payment towards principal we can work
backwards by subtracting the interest paid from the total payment for each period:

```
Payment Towards Principal = Total Payment - Payment Towards Interest
```

e.g.

```
£805.07 = £930.07 - £125.00
```

##### Putting It All Together

By combining the calculations and inputs above we can now start filling the schedule,
the process is as follows:

1. Calculate the Monthly Repayment amount
2. Starting with the first payment:
   - Calculate the interest on the current balance and apportion the payment
   - Calculate the remaining balance after application of the payment
3. Repeat step 2 for each periodic payment due using the remaining balance as the
   current balanace

e.g. for an amount of £20,000 to be financed over a 12 month period and a yearly
interest rate of 7.5% without a balloon payment resulting in a monthly repayment of
£1735.15:

| Period | Payment | Principal | Interest | Balance  |
| ------ | ------- | --------- | -------- | -------- |
| 1      | 1735.15 | 1610.15   | 125.00   | 18389.85 |
| 2      | 1735.15 | 1620.21   | 114.94   | 16769.64 |
| 3      | 1735.15 | 1630.34   | 104.81   | 15139.30 |
| 4      | 1735.15 | 1640.53   | 94.62    | 13498.77 |
| 5      | 1735.15 | 1650.78   | 84.37    | 11847.99 |
| 6      | 1735.15 | 1661.10   | 74.05    | 10186.89 |
| 7      | 1735.15 | 1671.48   | 63.67    | 8515.41  |
| 8      | 1735.15 | 1681.93   | 53.22    | 6833.49  |
| 9      | 1735.15 | 1692.44   | 42.71    | 5141.05  |
| 10     | 1735.15 | 1703.02   | 32.13    | 3438.03  |
| 11     | 1735.15 | 1713.66   | 21.49    | 1724.37  |
| 12     | 1735.15 | 1724.37   | 10.78    | 0.00     |

In the case of a balloon payment you would expect a final balance due of the balloon
payment amount, e.g. with a ballon payment of £10,000 resulting in a monthly repayment
of £930.07:

| Period | Payment | Principal | Interest | Balance  |
| ------ | ------- | --------- | -------- | -------- |
| 1      | 930.07  | 805.07    | 125.00   | 19194.93 |
| 2      | 930.07  | 810.11    | 119.97   | 18384.82 |
| 3      | 930.07  | 815.17    | 114.91   | 17569.65 |
| 4      | 930.07  | 820.26    | 109.81   | 16749.39 |
| 5      | 930.07  | 825.39    | 104.68   | 15924.00 |
| 6      | 930.07  | 830.55    | 99.52    | 15093.45 |
| 7      | 930.07  | 835.74    | 94.33    | 14257.71 |
| 8      | 930.07  | 840.96    | 89.11    | 13416.74 |
| 9      | 930.07  | 846.22    | 83.85    | 12570.52 |
| 10     | 930.07  | 851.51    | 78.57    | 11719.02 |
| 11     | 930.07  | 856.83    | 73.24    | 10862.19 |
| 12     | 930.07  | 862.19    | 67.89    | 10000.00 |
