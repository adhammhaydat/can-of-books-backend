"use strict";
const book = require("../modules/Book.modul");

const bookController = (req, res) => {
  book.find({}, (err, book) => (err ? res.send(err) : res.json(book)));
};
const handelUserInput = (req, res) => {
  book.findOne({email:req.body.email},(err,bookContent)=>{
    if(err){
      res.send('Ooops we have a error')
    }else{
      let data ={
        title:req.body["title"],
        description:req.body["description"],
        status:req.body["status"],
        
      };
      bookContent.aboutBooks.push(data);
      console.log(bookContent);
      bookContent.save();
      res.json(bookContent);

    }
  })
  ;
};

const deleteUser = (req, res) => {
  let userId = req.parmas["id"];

  book.findByIdAndDelete({ _id: userId }, (err, item) => {
    if (err) {
      console.log(oops);
    } else {
      console.log(userId);
      res.send(userId);
    }
  });
};
module.exports = { bookController, handelUserInput, deleteUser };
