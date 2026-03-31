const express=require("express")
const authRouter=require('./routes/auth.routes')
const songRouter=require('./routes/song.routes')
const cors = require('cors')
const cookieParser=require("cookie-parser")
const path =require('path');
const app=express()


app.use(express.json()) 
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(cookieParser())


app.use("/api/auth",authRouter)

app.use("/api/song",songRouter)


app.use(express.static(path.join(__dirname, "..", "public"))); 
app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports=app
