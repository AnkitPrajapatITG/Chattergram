const express = require("express");
const routes = require('./routes/index.js')


const cors = require("cors");

const dotenv = require("dotenv");
const { dbConnection } = require("./config/db.js");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("✅ App is running on port", port);
})

app.use('/api', routes)
dbConnection()

app.get("/", (req, res) => {
    res.send("<h3>Your server is running </h3>");
})
