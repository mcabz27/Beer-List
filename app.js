var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
console.log('port: ' + port);
var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL || 'postgres://mcabz27@localhost:5432/beerlist_db');
var mustacheExpress = require('mustache-express');
var bdPars = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
var fetch = require('node-fetch');
var methodOver = require('method-override');
var api = process.env.MY_API;
app.use(bdPars.urlencoded({
    extended: false
}));
app.use(bdPars.json());
app.engine('html', mustacheExpress());
app.use(methodOver('_method'));
app.set('view engine','html');
app.set('views',__dirname+'/views');
app.use(express.static(__dirname + "/public"));
app.use(session({
  secret: 'theTruthIsOutThere51',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.listen(port, function(){
  console.log('Server alive on port 8080!');
});

app.get('/', function(req, res){
  var logged_in;
  var email;
  var user = req.session.user
  if(user){
    logged_in = true;
    email = req.session.user.email
    res.redirect('search');
  }
  else{
  var data = {
    "logged_in": logged_in,
    "email": email
  }
  res.render('index', data);
}
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
  var user = req.session.user;
  // var id = req.users.id;
  // console.log(id);
  if (user){
    res.redirect('search');
  }
  db.one(
    "SELECT * FROM users WHERE email = $1", [data.email]
  ).catch(function(){
    res.send('Email/password not found')
  }).then(function(user){
    bcrypt.compare(data.password, user.password_digest, function(err, cmp){
      if(cmp){
        req.session.user = user;
        res.redirect('posts');
      } else {
        res.send('Email/password not found');
      }
    })
  })
})

app.get("/posts", function(req, res) {
  user = req.session.user;
    if(user === undefined){
    res.redirect('/');
  } else {
      db.many("SELECT * FROM beers").then(function(data){
      var beerData = data;
      // console.log(data);
      must = {user:user};
      res.render('postpage', {
      beers: beerData,
      user: must
      });
    })
  }
});

app.post("/postpage",function(req, res){
  var beerInfo = req.body;
  var user = req.session.user;
  db.none('INSERT INTO beers (name, user_id, alc_by_volume, description, availability, style) VALUES ($1,$2,$3,$4,$5,$6)', [beerInfo.name, user.id, beerInfo.alc_by_volume, beerInfo.description, beerInfo.availability, beerInfo.style])
    .then(function(data){
      var beers = data
      res.redirect('/posts')
  })
});

app.get('/search', function(req, res){
  var user = req.session.user;
  // console.log(user);
  if(user === undefined){
    res.redirect('/');
  } else {
  fetch('https://api.brewerydb.com/v2/beers?key='+api+'&format=json')
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        must = {user:user};
        // console.log(json);
        var info = json.data;
        res.render('search', {
          beers: info,
          user: must
        })
    });
  }
});

app.get('/members/:id', function(req, res){
  var user = req.session.user;
  // console.log(req.params.id);
    if(user === undefined){
    res.redirect('/');
  } else {
    db.many('SELECT * FROM beers WHERE user_id = $1', [req.params.id])
    .then(function(data){
      must = {user:user};
      var myData = data;
        res.render('members', {
          beer: myData,
          user: must
      });
    })
  }
})

app.delete('/beers/:id', function(req,res){
  var id = req.params.id;
  db.none("DELETE FROM beers WHERE id = $1", [req.params.id])
  .then(function(){
        res.render('members');
    })
  })

app.put('/updatebeer/:id', function(req,res){
  var id = req.params.id;
  var beers = req.body;
  db.none("UPDATE beers SET description = $1 WHERE id = $2", [beers.description, req.params.id]).then(function(){
    res.redirect('/posts')
  })
})




