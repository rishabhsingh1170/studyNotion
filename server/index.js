const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");
const profileRoutes = require("./routes/Profile");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
const cloudinaryConnect = require("./config/cloudinary");
const file = require("express-fileupload");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connection
database.connect();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/temp",
    })
)

//connect cloudinary
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);

//default route
app.use("/",(req,res) => {
    return res.json({
        success:true,
        message:"server is up and running...",
    })
});

app.listen(PORT, ()=>{
    console.log(`app is running at port no ${PORT}`);
})
