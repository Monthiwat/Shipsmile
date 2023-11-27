const express = require("express");
const path = require("path");

const app = express();
const port = 8080; // You can change the port if needed

// Serve files from the "dist" folder
app.use(express.static(path.join(__dirname, "../dist")));

// Define a route to serve your HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
