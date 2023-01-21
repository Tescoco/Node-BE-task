const express = require('express');
const openapi = require('express-openapi');
const searchQueries = new Set();
const fs = require('fs');


const app = express();
app.use(express.json());


openapi.initialize({
  app,
  apiDoc: require("./api-doc.js"),
  paths: "./src",
});

app.use((req, res, next) => {
  fs.appendFileSync('log.txt', `[${new Date().toISOString()}] ${req.method} ${req.url}\n`);
  next();
});

app.use((err, req, res, next) => {
  if (err instanceof openapi.RequestValidationError) {
    // invalid request
    res.status(err.status).json({ error: err.message });
  } else {
    // unexpected error
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 3000;

// don't run the server if this file is imported
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

module.exports = {
  app,
  searchQueries
};






