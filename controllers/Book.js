'use strict'
const book=require('../modules/Book.modul')

const bookController=(req,res)=>{

  book.find({}, (err, book) => err ? res.send(err) : res.json(book))
}
module.exports=bookController;