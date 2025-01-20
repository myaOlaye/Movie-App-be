const app = require("./app");
const { PORT = 3000 } = process.env;

// app.listen(PORT, () => {
//   console.log(`Listening on ${PORT}...`);
// });

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
