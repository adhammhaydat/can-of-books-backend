const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema({
  email:String,
  aboutBooks:[{description:String,
    status:String,
    title:String}]
  
  
});

const book = mongoose.model('Book',bookSchema)


module.exports=book




