const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log("✅ App is running on port" , port);
})

app.get("/",(req,res)=>{
    res.send("<h3>Your server is running </h3>");
})
