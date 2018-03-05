// in here get rid of mongo
// have a variable for the content in your json file 
// and parse the jason data 

//then have an app.get that that has a data.list  function 
//and then render by passing the array of the list to your ejs file 
//eventually to personalise the single file pages you would use and render another ejs file

//remember to npm ejs
// remember to install body parse to parse the json



console.log("lets hope for the best");
var express = require('express')
var app = express()

//if someone has defined port then let it be defined by them, 
//if not it will automatically go to 3000
var _port = process.env.PORT //|| 3000;

app.set('view engine', 'ejs');

//bodyparser needed in order to parse stuff in json file
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser); 

var fs = require ('fs');
var content = fs.readFileSync('./public/images.json');
var imageData = JSON.parse(content); 


app.use(express.static('public'));

app.get('/display',function(req,res){
  var all_images= [];
  console.log("this is the main display page");
  //this is the function used to pass the imageData from the json file
  //into the display ejs template
  imageData.list.forEach(function(item){
    all_images.push(item.name);
    });
  res.render('display.ejs',{images:all_images});
  console.log('images have loaded');

});

app.get('/you-are-here',function(req,res){
  
  var locationCode = req.query.code;
  for(var i = 0; i < imageData.list.length; i++){
    var element = imageData.list[i];
    if(element.tags[0] == locationCode){
      var src = element.name;
      res.render('singleDisplay.ejs',{src: src});
    }

  }

//you-are-here?code=location1

});


//make another template/get for single image display that then re-directs
//to display

//consider using the append method in that route to add in an upload form and make sure there is a url for it





app.listen(_port);