const app = require("./app");

// Setting the port
const PORT = process.env.PORT || 3000;

// Starting the server to listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger UI available at http://127.0.0.1:${PORT}/api-docs`);
});
