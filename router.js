const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

let USER = "";

passport.use("appLogin",
  new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  },(req,username,password,done) => {
    
    const [,,rootuser = "root",rootpassword = "root"] = process.argv;

    if( 
      (username==="guest" && password==="guest") ||
      (username === rootuser && password === rootpassword)
    ){
      USER = username;
      return done(null,username);
    } 
    return done(null,false);

  })
);

// ユーザー情報を登録する
passport.serializeUser( (username,done) => {
  // ここでハッシュ化するなどの処理をするが今回は特に何もしない
  done(null,username); // 成功した場合はこの記述※usernameを何処かに渡している場合ではない。
});

// クライアントとのセッションがあった場合
passport.deserializeUser( (username,done) => {
  // ここで正しいかの判定処理をするが今回は特に何もしない
  console.log("あれれ？")
  if(USER = username){
    done(null,username); // 成功した場合はこの記述※usernameを何処かに渡している場合ではない。
  }else{
    done(`no user ${username}`)
  }
 
});


router.use(passport.initialize());
router.use(passport.session());

router.get("/",(req,res) => {
  console.log(req)
  res.send({
    name: "kensuke"
  })
});

router.post("/",(req,res)=>{

  passport.authenticate(
    "appLogin",(err,user) => {

      let result = { success: false }

      if (err) return res.json(result)
      if (!user) return res.json(result)
      req.logIn(user, function(err) {
        if (err) return res.json(result)
        return res.json({...result,success: true});
      });
    }
  )(req,res)

});

module.exports = router