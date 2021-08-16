'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const app = express();
const PORT = process.env.PORT
const Book=require('./modules/Book.modul')
app.use(cors());
const mongoose=require('mongoose')
const bookController=require('./controllers/Book');


mongoose.connect('mongodb://localhost:27017/Book', {useNewUrlParser: true});

const seedBook=()=>{
  const newBook=new Book({
    email:"adhammohidat123@gmail.com",
    aboutBooks:[{
      description:"web developer",
    status:"beginer",
    title:"ADHAM MHAYDAT",},
    {
      description:"web developer",
      status:"beginer",
      title:"ADHAM MHAYDAT",
      
    },
    {
      description:"web developer",
      status:"beginer",
      title:"ADHAM MHAYDAT",
      
    }]
    
    
  })
  newBook.save();
  console.log(newBook);
}
  seedBook();
app.get('/book',bookController)

const client = jwksClient({
  // this url comes from your app on the auth0 dashboard 
  jwksUri: `https://${process.env.DOMAIN}/.well-known/jwks.json`
});

// this is a ready to use function
const getKey=(header, callback)=>{
  client.getSigningKey(header.kid, function(err, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
}
app.get('/book',(req,res)=>{

  
});



app.get('/auth', (request, response) => {
  const token=request.headers.authorization.split(' ')[1];
  jwt.verify(token,getKey,{},(err,user)=>{
      if(err){
        response.send('invalid token');
      }
      response.send(user)
      console.log('hiiii')
  })
  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})

app.listen(PORT, () => console.log(`listening on ${PORT}`))
