const express = require("express");
const cors = require("cors");
const app = express();
const indexRoutes = require("./routes/index.route")

const dotenv = require("dotenv");
const { populateIfNotAnyData } = require("./repository/user.repo");
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "local"}`,
});
console.log(`.env.${process.env.NODE_ENV || "local"}`);


app.use(express.json({ extended: false }));
app.use(cors({ credentials: true, origin: true }))


require("./config/db")(process.env.MONGO_URL);


app.use("/api", indexRoutes);

populateIfNotAnyData();

// All undefined routes 
app.use("*", (req, res) => {
  res.json({
    message:"Not found!"
  })
});






app.listen(3001,()=>{
    console.log("Listening on 3001...")
})