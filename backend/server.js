require("dotenv").config({path:'../.env'});
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./config/credentials");
const connectDb = require("./config/connectDb");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Connect to MongoDB
connectDb();

//??
app.use(credentials);

// Enable CORS
app.use(cors(corsOptions));

// Enable bodyParser
app.use(express.json());


//routes
app.get("/", (req, res) => {
    res.redirect("/chats");
});
app.use("/register",require("./routes/register"))
app.use("/login",require("./routes/login"))
//app.use("/refresh",require("./routes/refresh"))
//app.use("/logout",require("./routes/logout"))






mongoose.connection.once("open", () => {
    console.log("MongoDB Connected...");
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
});
