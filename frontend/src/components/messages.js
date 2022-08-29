import {
    Avatar,
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    InputBase,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import EditGroup from "./group/editGroup.js";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import useAuth from "../hooks/useAuth.js";

import io from "socket.io-client";

var socket;

const Messages = ({
    selectedChat,
    selectedChatName,
    reRenderChats,
    setReRenderChats,
    isGroupChat
}) => {
    const axios = useAxiosPrivate();

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [showGroupEdit, setShowGroupEdit] = useState(false);
    const [currChatId, setCurrChatId] = useState(selectedChat);

    const { auth } = useAuth();

    useEffect(() => {
        socket = io("http://localhost:5000");
        socket.emit("setup", { id: auth.id });
    }, []);

    const handleSubmit = async () => {
        const sendMessage = async () => {
            try {
                const { data } = await axios.post("/messages/" + selectedChat, {
                    message,
                });
                //console.log("new message", selectedChat);
                socket.emit("new message", data.chat.users, data.sender, data);
                let newMessages = [...messages];
                newMessages.unshift(data);
                axios.put("/messages/readby", {
                    messageId: data._id,
                    userId: auth.id,
                });

                setMessages(newMessages);
            } catch (err) {
                console.log(err);
            }
        };
        if (selectedChat && message !== "") {
            sendMessage();
            setMessage("");
        }
    };

    useEffect(() => {
        const setData = async () => {
            try {
                const messagesData = await axios.get(
                    "/messages/" + selectedChat
                );
                setMessages(messagesData.data);

                //console.log("messages", messagesData.data);
            } catch (err) {
                console.error(err);
            }
        };
        setCurrChatId(selectedChat);
        socket.emit("join chat", selectedChat);
        setData();
    }, [selectedChat]);

    useEffect(() => {
        //console.log("running");
        // while(!selectedChat){
        //     console.log("waiting....");
        // }
        socket.on("message received", (newMessage) => {
            //                     console.log(messages);
            setReRenderChats(!reRenderChats);
            if (!selectedChat || currChatId !== newMessage.chat._id) {
            } else {
                // console.log("new message", newMessage.chat);
                // console.log("selected chat", currChatId);
                let newMessages = [...messages];
                newMessages.unshift(newMessage);
                setMessages(newMessages);
                axios.put("/messages/readby", {
                    messageId: newMessage._id,
                    userId: auth.id,
                });
                // console.log(newMessages);
            }
        });
    });

    return (
        <>
             <EditGroup
                showGroupEdit={showGroupEdit}
                setShowGroupEdit={setShowGroupEdit}
                selectedChat={selectedChat}
                selectedChatName={selectedChatName}
            />
            <Box
                // sx={{
                //     width: "70%",
                //     height: "100%",
                //     backgroundColor: "background.paper",
                //     padding: ".5rem",
                // }}
                sx={{
                    position: "absolute",
                    width: "75vw",
                    height: "90vh",
                    left: "475px",
                    //top: "54px",
                    // pb: "1rem",
                    background: "#1976D2",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        height: "10%",
                        fontWeight: "500",
                        fontSize: "1.7rem",
                        ml: "1rem",
                        color: "white",
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        //gap={2}
                        height="100%"
                    >
                        <Stack
                            direction="row"
                            gap={5}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <AccountCircleIcon fontSize="large" />
                            <Typography
                                sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
                            >
                                {selectedChatName}
                            </Typography>
                        </Stack>
                       {isGroupChat && <IconButton>
                            <EditIcon
                                sx={{ color: "white" }}
                                onClick={() => setShowGroupEdit(true)}
                            />
                        </IconButton>}
                    </Stack>
                </Typography>
                <Stack
                    direction="column-reverse"
                    sx={{
                        width: "75vw",
                        height: "81%",
                        backgroundColor: "#D1D1D1",
                        //overflowY: "scroll",
                        pb:"1rem"
                        
                    }}
                    gap={2.5}
                >
                    {selectedChat === "" && "nothing to display"}
                    {selectedChat !== "" &&
                        messages?.map((message) => (
                            <Typography
                                key={message._id}
                                sx={{
                                    width: "100%",
                                    height: "1.4rem",

                                    //padding: ".5rem",
                                    mb: ".3em",
                                    //margin: ".1rem",
                                    textAlign:
                                        message.sender._id === auth.id
                                            ? "right"
                                            : "left",
                                    color:
                                        message.sender._id === auth.id
                                            ? "white"
                                            : "black",
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{
                                        backgroundColor:
                                            message.sender._id === auth.id
                                                ? "primary.main"
                                                : "#EBEBEB",
                                        padding: ".7rem",
                                        borderRadius: "1rem",
                                        //margin: "1rem",
                                        //ml: "0rem",
                                    }}
                                >
                                    {/* <Typography variant="body2">
                                    {message.sender.name}
                                </Typography>  STYLING PROBLEM !!!*/}
                                    {message.content}
                                </Typography>
                            </Typography>
                        ))}
                </Stack>
                {selectedChat && (
                    <FormControl fullWidth variant="standard">
                        <Paper
                            sx={{
                                mt: ".1",
                                height: "6.1vh",
                                width: "100%",
                                background: "white",
                                outline: "none",
                                border: "none",
                                fontSize: "24px",
                                pl: ".3rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <InputBase
                                hiddenLabel
                                id="filled-hidden-label-small"
                                variant="outlined"
                                size="small"
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                placeholder="Message.."
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end"></InputAdornment>
                                    ),
                                }}
                            />
                            <IconButton
                                aria-label="Send message"
                                onClick={handleSubmit}
                                edge="end"
                                sx={{ mr: "1em" }}
                                fontSize="large"
                            >
                                <SendIcon color="primary" />
                            </IconButton>
                        </Paper>
                        {/* <Button onClick={handleSubmit}>send</Button> */}
                    </FormControl>
                )}
            </Box>
        </>
    );
};

export default Messages;
