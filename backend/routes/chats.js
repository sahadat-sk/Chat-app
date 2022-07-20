const express = require("express");
const router = express.Router();


router.post("/", (req,res)=>{
    res.send("many many chats");
});

module.exports = router;
