import express from "express";
import router from "./paths";
import dbConnect from "./utility/mongodb";
require("dotenv").config();

dbConnect();

const PORT = process.env.PORT || 8081;
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use("/user", router);

app.listen(PORT, () => {
  console.log("Server listening on ", PORT);
});
