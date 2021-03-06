const express= require('express');
const hbs=require('hbs');
const fs=require('fs');

const port= process.env.PORT || 3000;

var app= express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now= new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n');
  next();
});

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=> {
  return text.toUpperCase();
});

app.get('/',(req,res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Vainkatesh',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'welcome to my website'
    // currentYear: new Date().getFullYear()
  });
});

app.get('/about',(req,res) => {
  // res.send('<h1>The About Page</h1>');
  res.render('about.hbs',{
    pageTitle: 'About Page'
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errrMessage:'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
