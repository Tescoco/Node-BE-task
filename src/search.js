const { searchQueries } = require('../index.js');

module.exports = function () {
  let operations = {
    POST,
  };

  function POST(req, res, next) {

    res.set('Content-Type', 'application/json');
    let query = req.body.search_query;

    // validate the query
    if (!query || typeof query !== 'string' || query.length < 1) {
      return res.status(400).json({
        error: 'Invalid search query'
      });
    }

    // convert the query to lower case to make the analysis case-insensitive
    query = query.toLowerCase();

    searchQueries.add(query);
    return res.status(200).json({
      status: 'ok'
    });
  }

  return operations;
};