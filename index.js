// const express = require("express");
// const app = express()

// const helmet = require('helmet');

// const countrycity = require("./countrycity");
// const port = process.env.PORT || 8080

// // Middleware
// app.use(helmet())

// const http = require('http');
// const webserver = http.createServer(app)
// const httpServer = webserver.listen(port,)



const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});