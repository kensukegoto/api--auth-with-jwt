const jwt = require("jsonwebtoken");
const {SECRET} = require("./config")

module.exports = (req,res,next) => {

  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token,SECRET,(err,decoded)=>{  // decoded = payloadで渡したjsonを復元したもの

      if(err){
        return res.json({
          success: false,
          error: "failed authentication"
        })
      } else {
        req.decoded = decoded;
        next();
      }
    })  
  } else {
    return res.json({
      success: false,
      error: "token is undefined"
    })
  }
}