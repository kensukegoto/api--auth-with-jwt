const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = 3000;

app.use(bodyParser.urlencoded({extended:true})) // フォームからのPOSTを扱いやすい形式に
app.use(bodyParser.json()) // JSONがPOSTsれた場合に扱いやすい形式に

app.use("/",require("./router.js"))
app.listen(PORT,()=>{
  console.log(`i'm listening at port ${PORT}`)
})