##Cachie Search Engine API

#Installation
Clone the repository: git clone https://github.com/tescoco/Node-BE-task.git
Install the dependencies: npm install
Start the server: npm start

#Endpoints
The server exposes the following endpoints:

POST /search - Accepts a search query of at least one word.
GET /analyze - Accepts a comma separated series of one or two words that we call the Analysis token. It returns the number of times the analysis token was found in previous search query and the time it took to complete the analysis process.

#Test
To run the tests: npm test

#Logging
The server logs all requests to the file log.txt in the root directory of the project.
