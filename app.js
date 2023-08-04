


import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";


const homeStartingContent = "Hello, Myself Vivek from India and welcome to my new Blog website";
const aboutContent = "I am a 3rd year undergraduate in Electronics and Communication Engineering from NIT,Silchar. I am a Full Stack Web Developer Enthusiast and also a guitar player.To know more about me follow my blogs!!!";
const contactContent = "For more information try contact me via my email i.e. vivek2010@gmail.com";
const writeContent = "For more information try contact me via my email i.e. vivek2010@gmail.com";



const app = express();

app.set('view engine', 'ejs');

let posts=[];


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{name:homeStartingContent,npost:posts});
  // console.log(posts);
});
app.get("/about",function(req,res){
  res.render("about",{about:aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact",{contact:contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose",function(req,res){
  const post={
    title: req.body.postTitle,
    body: req.body.postBody
  };
  posts.push(post);

  res.redirect("/");
})
app.get("/Write",function(req,res){
  res.render("Write",{write:writeContent});
});




//Dynamic URL
app.get("/posts/:postname",function(req,res){
  const requestedTitle = _.lowerCase (req.params.postname);
  //console.log(req.params.postname);
  posts.forEach(function(post){
    
    const storedTitle = _.lowerCase(post.title);
    if(requestedTitle===storedTitle){
      res.render("post",{title: post.title,content:post.body})
    }
  })
  
})
















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
