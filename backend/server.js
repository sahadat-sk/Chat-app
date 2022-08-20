require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./config/credentials");
const connectDb = require("./config/connectDb");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");

// Connect to MongoDB
connectDb();

//??
app.use(credentials);

// Enable CORS
app.use(cors(corsOptions));

// Enable bodyParser
app.use(express.json());

// Enable cookieParser
app.use(cookieParser());

//routes
app.get("/", (req, res) => {
    res.redirect("/chats");
});
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

//protected routes
app.use(verifyJWT);
app.use("/chats", require("./routes/chats"));
app.use("/users", require("./routes/users"));
app.use("/messages", require("./routes/messages"));

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected...");
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
    //console.log("New client connected");
    socket.on("setup", (user) => {
        //console.log("setup", user);
        if (user.id) {
            socket.join(user.id);
            socket.emit("connected to server", user);
        }
    });
    socket.on("join chat", (chatId) => {
        socket.join(chatId);
        //console.log("joined chat", chatId);
    });
    socket.on("new message", (users, sender, message) => {
        //console.log("messge sender", users);
        users.forEach((user) => {
            if (user !== sender._id) {
                //console.log("sending to", user);
                socket.in(user).emit("message received", message);
                //console.log("message sent",message);
            }
        });
    });
    socket.off("setup", (user) => {
        console.log("user Disconnected");
        socket.leave(user);
    });
});
