var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var pgp = require('pg-promise')();
var db = pgp('postgres://mcabz27@localhost:5432/beerdata_db');
var mustacheExpress = require('mustache-express');
var bdPars = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
app.use(bdPars.urlencoded({
    extended: false
}));
app.use(bdPars.json());
app.engine('html', mustacheExpress());
app.set('view engine','html');
app.set('views',__dirname+'/views');
app.use(express.static(__dirname + "/public"));
app.use(session({
  secret: 'theTruthIsOutThere51',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.listen(8080, function(){
  console.log('Server alive on port 8080!');
});

app.get('/', function(req, res){
  var logged_in;
  var email;
  if(req.session.user){
    logged_in = true;
    email = req.session.user.email
  }
  var data = {
    "logged_in": logged_in,
    "email": email
  }
  res.render('index', data);
})

app.get('/signup', function(req, res){
  res.render('signup')
});

app.post('/signup', function(req, res){
  var data = req.body;
  bcrypt.hash(data.password, 10, function(err, hash){
    db.none(
      "INSERT INTO users (email, password_digest) VALUES ($1, $2)",
      [data.email, hash]
    ).then(function(){
      res.send('User created, go login!!');
    })
  });
})

app.post('/login', function(req, res){
  var data = req.body;
  db.one(
    "SELECT * FROM users WHERE email = $1", [data.email]
  ).catch(function(){
    res.send('Email/password not found')
  }).then(function(user){
    bcrypt.compare(data.password, user.password_digest, function(err, cmp){
      if(cmp){
        req.session.user = user;
        res.redirect('/search');
      } else {
        res.send('Email/password not found');
      }
    })
  })
})

app.post("/members",function(req, res){
  var beerInfo = req.body;
  console.log(beerInfo);
  db.none('INSERT INTO beers (name,alc_by_volume,description,availability,style) VALUES ($1,$2,$3,$4,$5)', [beerInfo.name, beerInfo.alc_by_volume, beerInfo.description, beerInfo.availability, beerInfo.style]).then(function(data){
        res.redirect('/members')
  })
});

app.get("/members", function(req, res) {
  db.many("SELECT * FROM beers").then(function(data){
    var beerData = data
    console.log(beerData);
    res.render('members', {
      title: beerData
    });
  })
});

app.get('/search', function(req, res){
//search screen!
res.render('search');
})


// app.get('/members', function(req, res){

//   res.render('members');
// })






