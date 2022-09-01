var express = require('express');
var router = express.Router();
const users = require('../querys/user-config');

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

router.post('/rest/login',(req, res, next)=>{
  users.authenticate(req.body).then(data=>{
    if(data){
      req.session.loggedIn = true;
      req.session.user = req.body.username;
      res.redirect('/home');
    }
    else {
      res.render('login',{error: "The username or password is incorrect!"});
    }
  }).catch(data => {
    res.render('login',{error: "IThe username or password is incorrect!"});
  })
})



router.post('/rest/add-user', (req, res, next)=>{
  users.signup(req.body).then(data=>{
    res.send('Success')
  }).catch(err => {
    res.send("Error");
  })
})

module.exports = router;
