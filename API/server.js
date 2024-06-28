import app from "./app.js";

const PORT = 4000 || 5000;

app.listen(PORT, () =>
  console.log("> Server is up and running on port : " + PORT)
);
