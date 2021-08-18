"use strict";
const book = require("../modules/Book.modul");

const bookController = (req, res) => {
  book.find({}, (err, book) => (err ? res.send(err) : res.json(book)));
};
const handelUserInput = (req, res) => {
  let data = new book({
    email: req.body["email"],
    title: req.body["title"],
    description: req.body["description"],
    status: req.body["status"],
  });
  data.save();
  book.find({}, (error, item) => {
    if (error) {
      res.status(500).send("data not pass");
    } else {
      res.status(201).send(item);
    }
  });
};

const deleteUser = (req, res) => {
  let userId = req.params["id"];
  console.log(userId);
  book.findByIdAndDelete(userId, (err, item) => {
    if (err) {
      console.log("oops");
    } else {
      book.find({}, (error, ele) => {
        if (error) {
          res.status(500).send("thire wase a problem in database");
        } else {
          res.status(201).send(ele);
        }
      });
    }
  });
};
const updatBooks= (req, res) => {
  let userId=req.params.id;
    let userData=req.body
    console.log(userId);
    book.findOne({_id:userId},(err,item)=>{
        item.email=userData.email;
        item.descriptions=userData.description;
        item.title=userData.title;
        item.status=userData.status;
        item.save();
        res.json(item);   
    })

}
module.exports = { bookController, handelUserInput, deleteUser,updatBooks };
