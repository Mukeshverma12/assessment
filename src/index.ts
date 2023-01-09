import express, { Request, Response } from "express";
import connectTOMongodb from "./config/db";
import router from "./routes/route";
import bodyParser from "body-parser";
const cookieParser = require("cookie-parser");
import session from 'express-session'
import path from "path";
const app = express();

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "mv00123",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );
console.log(__dirname);



// app.get('/',(req:Request,res:Response)=>{
//     res.send("<h1>Mukesh</h1>")

// })

app.get('/logout', function(req, res){
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function(){
      res.redirect('/loginpage');
    });
  });

app.use("/", router)
app.get("/loginpage", function (req: Request, res: Response) {
    res.render('login')
})


connectTOMongodb()
app.listen(3003, (): void => {
    console.log("server us running");

})
