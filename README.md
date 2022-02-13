# Credit Card Reward Point System - JavaScript Full Stack Application with Unit Testing
***Tech Stack :*** MongoDB, Express.js, Angular & Node.js - MEAN Stack

# How to start / run application
## To Start Backend
1) Go to backend folder in Command Prompt (CMD)
2) Run command "npm i" to install all dependencies
3) Run command "nodemon app.js" to start the backend application server
4) Backend server will start running on Port 3000 => http://localhost:3000/
## To Start Frontend
1) Go to frontend folder in Command Prompt (CMD)
2) Run command "npm i" to install all dependencies
3) Run command "ng serve --open" to start the frontend application
4) Browser will open and frontend application will start running on Port 4200 => http://localhost:4200/

# Unit Testing
## Backend
1) To check code coverage of unit testing => Run command "npm run coverage"
2) To open code coverage report => Go to path "/backend/coverage/lcov-report" & open "index.html" file
## Frontend
1) To check code coverage of unit testing => Run command "ng test --code-coverage"
2) To open code coverage report => Go to path "frontend/coverage/frontend" & open "index.html" file

# Softwares / Tools required :
1) MongoDB shell version: 5.0.6
2) Express version: 4.17.2
3) Angular CLI version: 13.2.1
4) Node version: 16.13.0
5) Node Package Manager (npm) version: 8.4.0
6) Testing & Code Coverage: Jasmine, Karma, nyc(istanbul), supertest 


# Details about the project 
***The Problem Statement :*** 
The aim is to create a rewards calculation system that calculates the total monthly reward points earned based on a customer's credit card purchases. More than one reward points calculation rules could apply to a merchant’s transaction(s) and the system should maximize the calculated points for a merchant by considering different priorities or combinations of the rules.


***Sample Transactions :***
Here is a list of transactions for a customer that needs to be considered for your solution.
```
transactions = {
  "T01": {"date": "2021-05-01", "merchant_code" : "sportcheck", "amount_cents": 21000},
  "T02": {"date": "2021-05-02", "merchant_code" : "sportcheck", "amount_cents": 8700},
  "T03": {"date": "2021-05-03", "merchant_code" : "tim_hortons", "amount_cents": 323},
  "T04": {"date": "2021-05-04", "merchant_code" : "tim_hortons", "amount_cents": 1267},
  "T05": {"date": "2021-05-05", "merchant_code" : "tim_hortons", "amount_cents": 2116},
  "T06": {"date": "2021-05-06", "merchant_code" : "tim_hortons", "amount_cents": 2211},
  "T07": {"date": "2021-05-07", "merchant_code" : "subway", "amount_cents": 1853},
  "T08": {"date": "2021-05-08", "merchant_code" : "subway", "amount_cents": 2153},
  "T09": {"date": "2021-05-09", "merchant_code" : "sportcheck", "amount_cents": 7326},
  "T10": {"date": "2021-05-10", "merchant_code" : "tim_hortons", "amount_cents": 1321}
}
```

***The Ask :***
Assuming that each $1 spend is only counted once, implement a method that takes the customer transactions as an input (Merchant Code -> Purchase Amount) and calculates the total maximum rewards points earned for the month , the maximum reward points applied for each transaction.

***Rules :***
```
● Rule 1: 500 points for every $75 spend at Sport Check, $25 spend at Tim Hortons and $25 spend at Subway
● Rule 2: 300 points for every $75 spend at Sport Check and $25 spend at Tim Hortons
● Rule 3: 200 points for every $75 spend at Sport Check
● Rule 4: 150 points for every $25 spend at Sport Check, $10 spend at Tim Hortons and $10 spend at Subway
● Rule 5: 75 points for every $25 spend at Sport Check and $10 spend at Tim Hortons
● Rule 6: 75 point for every $20 spend at Sport Check
● Rule 7: 1 points for every $1 spend for all other purchases (including leftover amount)
```

## Examples

Here are a few examples to help understand how to use rules to calculate the reward points. Each example has a set of transactions and rules to use for reward points calculation. These examples may not necessarily be the solution to the main problem.

### Example 1
***Transactions :***
```
transactions = {
  'T1': {'date': '2021-05-09', 'merchant_code' : 'sportcheck', 'amount_cents': 7326},
  'T2': {'date': '2021-05-10', 'merchant_code' : 'tim_hortons', 'amount_cents': 1321}
}
```

***Rules :***
```
● Rule 1: 10 points for every $1 spend at Sport Check 
```

***Solution :***
```
● Rule 1: 10 points for every $1 spend at Sport Check => Promotion Applied x 73

Total Points: 730

Transaction Level Points:
● T1 - 730
● T2 - 0
```

### Example 2
***Transactions :***
```
transactions = {
  'T1': {'date': '2021-05-09', 'merchant_code' : 'sportcheck', 'amount_cents': 7326},
  'T2': {'date': '2021-05-10', 'merchant_code' : 'tim_hortons', 'amount_cents': 1321}
}
```

***Rules :***
```
● Rule 1: 10 points for every $1 spend at Sport Check
● Rule 2: 100 points for every $5 spend at Sport Check
```

***Solution :***
```
● Rule 1: 10 points for every $1 spend at Sport Check => Promotion Applied x 3
● Rule 2: 100 points for every $5 spend at Sport Check => Promotion Applied x 14

Total Points: 1430

Transaction Level Points:
● T1 - 1430
● T2 - 0
```


### Example 3
***Transactions :***
```
transactions = {
  'T1': {'date': '2021-05-09', 'merchant_code' : 'sportcheck', 'amount_cents': 7326},
  'T2': {'date': '2021-05-10', 'merchant_code' : 'tim_hortons', 'amount_cents': 1321}
}
```

***Rules :***
```
● Rule 1: 100 points for every $5 spend at Sport Check
● Rule 2: 10 points for every $1 spend for all other purchases
```

***Solution :***
```
● Rule 1: 100 points for every $5 spend at Sport Check => Promotion Applied x 14
● Rule 2: 10 points for every $1 spend for all other purchases (including leftover amount) => Promotion Applied x 16

Total Points: 1560

Transaction Level Points:
● T1 - 1430
● T2 - 130
```

### Example 4
***Transactions :***
```
transactions = {
  'T1': {'date': '2021-05-09', 'merchant_code' : 'sportcheck', 'amount_cents': 2500},
  'T2': {'date': '2021-05-10', 'merchant_code' : 'tim_hortons', 'amount_cents': 1000},
  'T3’: {'date': '2021-05-10', 'merchant_code' : 'the_bay', 'amount_cents': 500}
}
```

***Rules :***
```
Same rules as stated in the main problem.
```

***Solution :***
```
● Rule 6: 75 point for every $20 spend at Sport Check => Promotion Applied x 1
● Rule 7: 1 points for every $1 spend for all other purchases (including leftover amount) => Promotion Applied x 20

Total points: 95

Transaction level points:
● T1 - 80 (rule 6 & 7)
● T2 - 10 (rule 7)
● T3 - 5 (rule 7)
```

***Explanation :***
```
Two sets of rules apply to this input
● If you use combination rules 5 and 7, the total points is 80 but that’s not the max total that can be achieved.
● If you use combination rules 6 and 7, the total points is 95 which is the correct solution.
```
