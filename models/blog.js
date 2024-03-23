const { Schema, model } = require("mongoose");

const blogSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImageURL:{
        type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
},{timestamps:true});

const BLOG=model("blogs",blogSchema)

module.exports=BLOG;