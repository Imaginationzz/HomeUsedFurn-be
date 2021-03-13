const express= require("express");
const cors = require("cors");
const passport = require("passport");
const { join } = require("path")

 const listEndpoint = require("express-list-endpoints");
 const mongoose = require("mongoose");
 const oauth = require("./services/auth/oauth")
//ERRORS IMPORTS
const {
  notFoundHandler,
  forbiddenHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandlers")


  const usersRouter = require("./services/users");
  const productsRouter = require("./services/products");


  const server = express();




  const PORT = process.env.PORT || 3002,
  accessOrigin =
    process.env.NODE_ENV === "production"
      ? [process.env.FE_URL_DEV, process.env.FE_URL_PROD]
      : [process.env.FE_URL_DEV, "http://localhost:3001"],
  corsOptions = {
    origin: function (origin, callback) {
      if (accessOrigin.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(
          new Error("CORS ISSUES : Invalid origin - Check access origins list")
        );
      }
    },
  };
  //MIDDLEWARE
  server.use(express.json());
  server.use(cors(corsOptions));
  const staticFolderPath = join(__dirname, "../public");
server.use(express.static(staticFolderPath));
  //server.use(passport.initialize());
  
//routes

server.use("/user", usersRouter);
server.use("/products", productsRouter);

  //ERRORS
  
server.use(badRequestHandler)
server.use(forbiddenHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)
  
  //CONSOLE LOGS
  console.log(listEndpoint(server));
  
  //MONGODB CONNECTION
  mongoose
    .connect(process.env.MONGODB_CONNECTION, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    //SERVER LISTEN
    .then(
      server.listen(PORT, () => {
        process.env.NODE_ENV === "production"
          ? console.log(`Server running ONLINE on : ${PORT}`)
          : console.log(`Server running LOCALLY on : http://localhost:${PORT}`);
      })
    )
    .catch((error) => console.log(error));
  