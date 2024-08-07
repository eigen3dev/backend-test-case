const swaggerJsDoc = require("swagger-jsdoc");

/**
 * Configures Swagger API documentation.
 */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API Documentation Book Borrowing System",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer token to access these api endpoints",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/**/*.js", "./swagger/*.js"],
};

// Generate Swagger documentation based on the provided options.
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Export module
module.exports = swaggerDocs;
