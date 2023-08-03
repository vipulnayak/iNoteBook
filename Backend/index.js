const connectToMongo = require("./db");
const express = require("express");
const CustomError= require("./Controllers/CustomError");
const GLobalErrorHandler =require("./Controllers/GlobalErrorHandler")
require('dotenv').config();
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.all('*',(req,res,next)=>{
  // const err =new Error(`cant find ${req.originalUrl} on the server`);
  // err.status="fail";
  // err.statuscode=404;
  const  err= new CustomError(`cant find ${req.originalUrl} on the server`,404);
  next(err);
})

app.use(GLobalErrorHandler);

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
});
