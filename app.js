const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const PORT = 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cookieParser());
const SESSION_SECRET = "qwerty";

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: "ssiidd"
}));


app.use(bodyParser.urlencoded({extended:true})) // フォームからのPOSTを扱いやすい形式に
app.use(bodyParser.json()) // JSONがPOSTsれた場合に扱いやすい形式に


app.use("/",require("./router.js"))
app.listen(PORT,()=>{
  console.log(`i'm listening at port ${PORT}`)
})