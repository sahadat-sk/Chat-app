import {
    Box,
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import SendIcon from "@mui/icons-material/Send";
import { height } from "@mui/system";

const Messages = ({ selectedChat ,selectedChatName}) => {
    const axios = useAxiosPrivate();

    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        const sendMessage = async () => {
            try {
                const { data } = await axios.post("/messages/" + chatId, {
                    message,
                });
            } catch (err) {
                console.log(err);
            }
        };
        if (chatId && message !== "") {
            sendMessage();
            setMessage("");
        }
    };

    useEffect(() => {
        const changeId = async () => {
            const { data } = await axios.post("/chats/", {
                userId: selectedChat,
            });
            setChatId(data._id);
        };
        changeId();
    }, [selectedChat]);

    useEffect(() => {
        const setData = async () => {
            try {
                const { data } = await axios.post("/chats/", {
                    userId: selectedChat,
                });
                const chatId = data._id;

                const messagesData = await axios.get("/messages/" + chatId);
                setMessages(messagesData.data);
                console.log("messages", messagesData.data);
            } catch (err) {
                console.error(err);
            }
        };
        setData();
    }, [chatId]);

    return (
        <Box
            sx={{
                width: "70%",
                height: "100%",
                backgroundColor: "background.paper",
                padding: ".5rem",
            }}
        >
            <Typography variant="h5" sx={{ height: "10%" }}>
                {selectedChatName}
            </Typography>
            <Stack
                direction="column-reverse"
                sx={{
                    width: "100%",
                    height: "84%",
                    backgroundColor: "#eceff1",
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
                                    message.sender._id === selectedChat
                                        ? "left"
                                        : "right",
                                color:
                                    message.sender._id === selectedChat
                                        ? "white"
                                        : "black",
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{
                                    backgroundColor:
                                        message.sender._id === selectedChat
                                            ? "primary.main"
                                            : "#cfd8dc",
                                    padding: ".7rem",
                                    borderRadius: "1rem",
                                    margin: "1rem",
                                    ml: "0rem",
                                }}
                            >
                                {message.content}
                            </Typography>
                        </Typography>
                    ))}
            </Stack>
            <FormControl fullWidth sx={{ mt: 1  }} variant="standard">
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    
                    InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Send message"
                                onClick={handleSubmit}
                                edge="end"
                            >
                                <SendIcon color="primary"/>
                            </IconButton>
                        </InputAdornment>
                    
                }}
                />
                {/* <Button onClick={handleSubmit}>send</Button> */}
            </FormControl>
        </Box>
    );
};

export default Messages;
