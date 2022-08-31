var express = require('express');
var router = express.Router();
const users = require('../querys/user-config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/rest/login',(req, res, next)=>{
  console.log(req.body)
  users.authenticate(req.body).then(data=>{
    console.log("yoo")
  })
})

router.get('/signup', (req, res, next) => {
  res.render('signup');
})

router.post('/rest/add-user', (req, res, next)=>{
  users.signup(req.body).then(data=>{
    res.send('Success')
  }).catch(err => {
    res.send("Error");
  })
})

module.exports = router;
