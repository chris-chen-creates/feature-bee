# Feature Bee 🐝
A simple feature flagging service 

## Dependencies
- [node.js](https://nodejs.org/en/) v14.11 or later
- [npm](https://www.npmjs.com/) v6.14.8 or later
- mysql - You can get the free community edition [here](https://dev.mysql.com/downloads/mysql/)
- [goose](https://github.com/pressly/goose) - v2.7.0-rc3 or later
- [jest](https://jestjs.io/) (for testing)
- [postman](https://www.postman.com/) (for hitting the server with a request)
## Setup
1. Download the .zip file or clone the repo using the github command line tool:    
```
    gh repo clone chris-chen-creates/feature-bee
```
2. Install the dependencies using: 
```
    npm i
```
## How to run
1. Start the MySQL server by using the command `mysql.server start`
2. In terminal, navigate to the server folder within feature-bee
3. Run `npm start` within a terminal
4. Use Postman to make requests to the server