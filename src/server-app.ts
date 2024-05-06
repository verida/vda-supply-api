import express from 'express'
//import bodyParser from 'body-parser'
import router from './routes'

// Set up the express app
const app = express();
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))
// Commenting out authorization for now
/*app.use(basicAuth({
  authorizer: validator.authorize,
  authorizeAsync: true,
  unauthorizedResponse: validator.getUnauthorizedResponse
}))*/
app.use(router)


module.exports=app

/*
//Example code to create HTTPS server (for facebook testing)

const https = require("https")
const fs = require("fs")

const key = fs.readFileSync("./keys/server.key")
const cert = fs.readFileSync("./keys/server.cert")

https.createServer(
    {
      key,
      cert
    },
    app
  ).listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});*/