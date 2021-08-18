"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const Book = require("./modules/Book.modul");
app.use(cors());
const mongoose = require("mongoose");
const {
  bookController,
  handelUserInput,
  deleteUser,
  updatBooks,
} = require("./controllers/Book");

mongoose.connect("mongodb://localhost:27017/Book", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedBook = () => {
  const newBook = new Book({
    email: "adhammohidat123@gmail.com",

    description: "web developer",
    status: "beginer",
    title: "ADHAM MHAYDAT",
  });
  newBook.save();

  const newBook2 = new Book({
    email: "hello@gmail.com",

    description: "web developer",
    status: "beginer",
    title: "ma'moon",
  });
  newBook2.save();
  const newBook3 = new Book({
    email: "hiiii@gmail.com",

    description: "web developer",
    status: "beginer",
    title: "thaa'er",
  });
  newBook3.save();
};
// seedBook();

app.get("/book", bookController);

app.post("/user-input", handelUserInput);

app.delete("/user-delete/:id", deleteUser);

app.put("/updat-data/:id", updatBooks);

const client = jwksClient({
  // this url comes from your app on the auth0 dashboard
  jwksUri: `https://${process.env.DOMAIN}/.well-known/jwks.json`,
});

// this is a ready to use function
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};
// app.get('/book',(req,res)=>{

// });

app.get("/auth", (request, response) => {
  const token = request.headers.authorization.split(" ")[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      response.send("invalid token");
    }
    response.send(user);
  });
  // TODO:
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
