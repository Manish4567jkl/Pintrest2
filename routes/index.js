var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');
const localStratergy = require('passport-local');
const upload = require('./multer')
passport.use(new localStratergy(userModel.authenticate()))
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('index');
});

router.get('/register' , function(req,res){
  res.render('register')
})

router.get('/profile' ,isLoggedIn, function(req,res){
  res.render('profile')
})

router.post('/register' , function(req,res){
  const data = new userModel({
    username : req.body.username,
    contact : req.body.contact,
    email : req.body.email
  })
  userModel.register(data,req.body.password)
  .then(function(){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile')
    })
  })
})


router.post('/login' , passport.authenticate("local" , {
  failureRedirect : "/",
  successRedirect : "/profile"

}),function(req,res){
  
})

router.get('/logout' , function(res,req,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})


router.get('/edit' , function(req,res){
  res.render('edit')
})

router.post('/fileupload' ,isLoggedIn, upload.single("image") ,(req,res)=>{
    res.send('uploaded')
})



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}


module.exports = router;
