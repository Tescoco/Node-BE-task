const apiDoc = {
  swagger: "2.0",
  basePath: "/",
  info: {
    title: "Cachie API",
    version: "1.0.0"
  },
  paths: {
    "/analyse": {
      get: {
        summary: "Analyze",
        operationId: "analyse",
        responses: {
          200: {
            description: "Success",
            schema: {
              type: "string",
              description: "returns the number of times the analysis token was found "
            }
          },
          400: {
            description: "Failed",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Invalid analysis token"
                }
              }
            }
          },
        }
      }
    },
    "/search": {
      post: {
        summary: "Search",
        operationId: "search",
        responses: {
          200: {
            description: "Success",
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  enum: [
                    "ok"
                  ]
                }
              }
            }
          },
          400: {
            description: "Failed",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Invalid search query"
                }
              }
            }
          },
        }
      }
    }
  },
};

module.exports = apiDoc;