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
  
  let locationCode = req.query.code;
  for(let i = 0; i < imageData.list.length; i++){
    let element = imageData.list[i];
    if(element.tags[0] == locationCode){
      let src = element.name;
      res.render('singleDisplay.ejs',{src: src});
    }

  }

});


//make another template/get for single image display that then re-directs
//to display




app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})