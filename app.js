const express = require("express");

const bodyParser= require("body-parser");

var items = [];
var workItems = [];

const app = express();



app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.get("/", function(req, res){
   
    var today = new Date();

    var options = {
        weekday : "long",
        day : "numeric",
        month : "long",
    };
    let day = today.toLocaleDateString("en-US", options);

    res.render("list",{listHead: day,newListItems: items})

});

app.post("/" , function(req,res){

    console.log(req.body);

    var item = req.body.newItem;

    if(req.body.listbtn === "Work List "){

        workItems.push(item);

        res.redirect("/work");       

    } 

    else{
    
        items.push(item);
    
        res.redirect("/");
    
    }
});

app.get("/work", function(req, res){

    res.render("list", {listHead:"Work List",newListItems: workItems});

})

app.listen(3000, function(){
    console.log("Server listening at port 3000");
})