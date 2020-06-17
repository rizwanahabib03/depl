//jshint esversion:6

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




mongoose.connect('mongodb+srv://root:0995@nodejs-2j0z7.mongodb.net/newdb', {useUnifiedTopology: true, useNewUrlParser: true  });


const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', itemsSchema);
// const items = ["Buy food","Eat Food"];

const item1 = new Item ({
  name: "Welcome to your todoList!!"
});



const defaultItems = [item1];



app.get("/", function(req, res) {

Item.find({},function(err,foundItems){

if(foundItems.length === 0)
{
  Item.insertMany(defaultItems,function(err){
    if (err){
      console.log(err);
    } else {
      console.log ("Sucessfully saved default values");
    }
  });
  res.redirect("/");
} else{
  res.render("list", {listTitle: "Today", newListItems: foundItems});
}

});

});

app.post("/", function(req, res){

const itemName = req.body.newItem;

const item = new Item({
  name:itemName
});
item.save();
res.redirect("/");
});

app.post("/delete",function(req,res){

const checkedItemID = req.body.checkbox;
Item.findByIdAndRemove (checkedItemID,function(err){
  if (!err){
    console.log("Sucessfully deleted checked item");
    res.redirect("/");
  }
});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
