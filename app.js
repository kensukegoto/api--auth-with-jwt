const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");
const {
  SECRET,
  ROOT,
  GUEST
} = require("./config")
const morgan = require("morgan");
const PORT = 3000; 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
  next();
});

app.set("secretKey",SECRET);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// リクエストをコンソール上に出力
app.use(morgan("dev"))

const apiRoutes = express.Router();

app.use("/api",apiRoutes);

apiRoutes.post("/login",(req,res)=>{

  if(
    (req.body.username === ROOT.name && req.body.password === ROOT.pass) ||
    (req.body.username === GUEST.name && req.body.password === GUEST.pass)){
    const payload = {
      name: req.body.username
    }
    const token = jwt.sign(payload,app.get("secretKey"))
    res.json({
      success: true,
      token: token,
      error: null
    })
  }else{
    res.json({
      success: false,
      token: null,
      error: "login failed"
    })
  }
})

const VerifiyToken = require("./verifyToken");
apiRoutes.get("/alive",VerifiyToken,(req,res,next)=>{

  if([ROOT.name,GUEST.name].indexOf(req.decoded.name) === -1){
    
    return res.json({
      success: false,
      user: null,
      error: "invalid user"
    })
  }

  res.json({
    success: true,
    user: req.decoded.name,
    error: null
  })

})

app.listen(PORT,()=>{
  console.log(`PORT ${PORT} is opened`)
});
