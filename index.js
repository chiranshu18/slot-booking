const express = require("express");
const app = express();
app.use(express.json());

const authRouter = require("./src/routes/authRoute");
app.use("/api", authRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
