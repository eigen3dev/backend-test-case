const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/Auth/route");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../swagger/swagger");

// Creating an instance of the Express application
const app = express();

// Parse JSON request bodies
app.use(bodyParser.json());

// Registering routes
app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Export module
module.exports = app;
