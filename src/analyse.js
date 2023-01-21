const { searchQueries } = require('../index.js');


module.exports = function () {
  let operations = {
    GET,
  };

  function GET(req, res, next) {
    try {
      const start = Date.now();
      const analysisToken = req.query.analysis_token;

      // validate the analysis token
      if (!analysisToken || typeof analysisToken !== 'string' || analysisToken.length < 1) {
        return res.status(400).json({
          error: 'Invalid analysis token'
        });
      }

      // split the analysis token into words
      const words = analysisToken.split(',');
      // count the occurrences of each word in the search queries
      const results = {};
      for (const word of words) {
        results[word] = 0;

        for (const query of searchQueries) {

          if (query.includes(word)) {
            // get the number of occurrences of the word in the query
            const occurrences = query.split(word).length - 1;
            // add the number of occurrences to the total
            results[word] += occurrences;
          }
        }
      }

      // calculate the duration of the analysis
      const time = Date.now() - start
      return res.status(200).json({
        results: results,
        time: `${time} ms`
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  }

  return operations;
};
