import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import EditGroup from "./group/editGroup.js";

import useAuth from "../hooks/useAuth.js";

import io from "socket.io-client";

var socket;

const Messages = ({
    selectedChat,
    selectedChatName,
    reRenderChats,
    setReRenderChats,
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
                sx={{
                    width: "70%",
                    height: "100%",
                    backgroundColor: "background.paper",
                    padding: ".5rem",
                }}
            >
                <Typography variant="h5" sx={{ height: "10%" }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={2}
                        height="100%"
                    >
                        {selectedChatName}
                        <IconButton>
                            <EditIcon onClick={() => setShowGroupEdit(true)} />
                        </IconButton>
                    </Stack>
                </Typography>
                <Stack
                    direction="column-reverse"
                    sx={{
                        width: "100%",
                        height: "84%",
                        backgroundColor: "#eceff1",
                        overflowY: "scroll",
                    }}
                >
                    {selectedChat === "" && "nothing to display"}
                    {selectedChat !== "" &&
                        messages?.map((message) => (
                            <Typography
                                key={message._id}
                                sx={{
                                    width: "100%",
                                    height: "1.4rem",

                                    padding: ".5rem",
                                    margin: ".1rem",
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
                                                : "#cfd8dc",
                                        padding: ".7rem",
                                        borderRadius: "1rem",
                                        margin: "1rem",
                                        ml: "0rem",
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
                    <FormControl fullWidth sx={{ mt: 1 }} variant="standard">
                        <TextField
                            hiddenLabel
                            id="filled-hidden-label-small"
                            variant="outlined"
                            size="small"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Send message"
                                            onClick={handleSubmit}
                                            edge="end"
                                        >
                                            <SendIcon color="primary" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {/* <Button onClick={handleSubmit}>send</Button> */}
                    </FormControl>
                )}
            </Box>
        </>
    );
};

export default Messages;
