var express = require('express');
var router = express.Router();
const users = require('../querys/user-config');
const msge = require('../querys/messages');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
})

router.get('/home',(req, res, next)=>{
  if(req.session.loggedIn) {
    res.render('home');
  }
  else{
    res.redirect('/');
  }
})

router.get('/rest/get-frnds', (req, res, next)=> {
  if(req.session.loggedIn) {
    users.getAllFrnds().then(data => {
      res.send(data);
    }).catch(err => {
      res.send("Failed");
    })
  }
  else{
    res.redirect('/');
  }
});

router.get('/rest/get-user-details', (req, res, next)=> {
  if(req.session.loggedIn) {
    res.send({_id : req.session.userId, name: req.session.user})
  }
  else{
    res.redirect('/');
  }
});

router.post('/rest/login',(req, res, next)=>{
  users.authenticate(req.body).then((data)=>{
    if(data){
      req.session.loggedIn = true;
      req.session.userId = data._id.toString();
      req.session.user = data.name;
      res.redirect('/home');
    }
    else {
      res.render('login',{error: "The username or password is incorrect!"});
    }
  }).catch(data => {
    res.render('login',{error: "The username or password is incorrect!"});
  })
})

router.post('/rest/add-user', (req, res, next)=>{
  users.signup(req.body).then(userId =>{
    if(userId) {
      msge.createUserStorage(userId).then(data => {
        console.log("user storage created",)
      }).catch(err => {
        console.log(err)
      })
    }
    res.redirect('/');
  }).catch(err => {
    res.send("Error");
  })
})

module.exports = router;
