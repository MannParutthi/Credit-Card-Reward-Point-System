# Credit Card Reward Point System - JavaScript Full Stack (MEAN) Application with Unit Testing & End to End Automation Testing + Application logging with Log data analysis, monitoring and visualization using ELK Stack
***Tech Stack :*** MongoDB, Express.js, Angular & Node.js - MEAN Stack + Elasticsearch, Logstash & Kibana - ELK Stack

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

# End to End Testing
Go to "frontend" folder and run command "ng e2e" => Cypress Window will open which will have different testcase - click on it to run

# Setup ELK Stack in Local
## Elasticsearch (Storage & Indexing) 
Download Link : https://www.elastic.co/downloads/elasticsearch  
Note: Refer "ELK Stack\elasticsearch.yml" file given in this Repo & follow steps mentioned below
1) Go to config folder => open elasticsearch.yml file  
		Add "action.auto_create_index: .monitoring*,.watches,.triggered_watches,.watcher-history*,.ml*" this line to allow automatic index creation  
		Save and close the file 
2) Go to bin folder => run command "elasticsearch.bat" it will generate password and enrollment token for kibana (copy and save it for future use)
3) Go to config folder => open elasticsearch.yml file  
		Change enabled to false in xpack.security.http.ssl & xpack.security.transport.ssl  
		Save and close the file  
4) Go to bin folder => run command "elasticsearch.bat"
5) Check "http://localhost:9200/" it will ask login credentials => username = elastic & password = elastic password generated which you copied  
	To reset and get password again => Go to bin folder => run command "elasticsearch-reset-password -u elastic"
6) Go to bin folder => run command "elasticsearch-reset-password -u kibana_system" => copy and save the kibana password 
## Kibana (Data Analysis & Visualization)
Download Link : https://www.elastic.co/downloads/kibana  
Note: Refer "ELK Stack\kibana.yml" file given in this Repo & follow steps mentioned below
1) Go to config folder => open kibana.yml file  
		Uncomment server.port, server.host, elasticsearch.host, elasticsearch.username & elasticsearch.password  
		Update the password => the kibana password which you saved previously  
		Save and close the file  
2) Go to bin folder => run command "kibana.bat"
3) Go to "http://localhost:5601" it will ask login credentials => username = elastic & password = elastic password which you copied
## Logstash (Data Processing)
Download Link : https://www.elastic.co/downloads/logstash  
Note: Refer "ELK Stack\credit-card-reward-calculator-logstash.conf" file given in this Repo & follow steps mentioned below
1) Go to config folder => open the credit-card-reward-calculator-logstash.conf file  
		Update the password => the elastic password which you saved previously  
2) Go to bin folder => run command "logstash -f .\config\credit-card-reward-calculator-logstash.conf --config.reload.automatic"
## Create Kibana Dashboard
On Elastic Search Portal ==>  
1) Go to Stack Management ==> Index Management ==> find file "logstsh_index_logdata-credit-card-reward-point-system-%{+YYYY.MM.dd}" with today's date => copy name  
2) Go to Stack Management ==> Data Views ==> Create Data View => In index pattern write "logstsh_index_logdata-credit-card-reward-point-system" & give any name as requried => Click Save data view to kibana   
3) Go to http://localhost:5601/app/home#/ ==> Click on 'Discover' from the left menu ==> Select the Data View created to check the data which is parsed and will be used for visualization in dashboard 
4) Go to Dashboard ==> Create Dashboard ==> Click on Create Visualization ==> Top left side in dropdown select the data view name which you created in prev step  
  

# Softwares / Tools required :
1) MongoDB shell version: 5.0.6
2) Express version: 4.17.2
3) Angular CLI version: 13.2.1
4) Node version: 16.13.0
5) Node Package Manager (npm) version: 8.4.0
6) Testing & Code Coverage: Jasmine, Karma, Nyc(Istanbul), Supertest
7) End to End Testing: Cypress
8) ELK Stack: Elasticsearch v8.5.3, Logstash v8.5.3, Kibana v8.5.3

# Architecture
![Architecture - Credit Card Reward Point System](https://user-images.githubusercontent.com/26864799/234319612-fa828169-2dea-4ae6-97c4-59b3e486e901.png)
![image](https://user-images.githubusercontent.com/26864799/153859926-2d72ded6-1f70-4444-af57-8ef52fd4ec5a.png)

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
