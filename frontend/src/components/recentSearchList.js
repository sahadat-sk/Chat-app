import * as React from "react";
import List from "@mui/material/List";
import ListItem from "./recentItem.js";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

import AxoisPrivate from "../hooks/useAxiosPrivate.js";
import { useState, useEffect } from "react";
import { Box, Menu } from "@mui/material";
import useAuth from "../hooks/useAuth.js";

export default function AlignItemsList({
    setSelectedChat,
    setSelectedChatName,
}) {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    const { auth } = useAuth();

    const axios = AxoisPrivate();

    useEffect(() => {
        setLoading(true);
        const setData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/chats/");
                setChats(data);
                //console.log(auth.id);
                //console.log(data[0].latestMessage);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        setData();
    }, []);

    const getChatName = (users) => {
        //console.log(users);
        const name = users?.filter((user) => user._id !== auth.id)[0]?.name;
        //console.log(name)
        return name;
    };

    return (
        <>
            {!loading && (
                <Box
                    sx={{
                        width: "100%",
                        bgcolor: "#eceff1",

                        zIndex: 1,
                    }}
                >
                    <List>
                        {chats.length > 0 &&
                            chats.map((chat) => (
                                <ListItem
                                    key={chat._id}
                                    name={
                                        chat.chatName !== "sender"
                                            ? chat.chatName
                                            : getChatName(chat.users)
                                    }
                                    userId={chat._id}
                                    setSelectedChat={setSelectedChat}
                                    setSelectedChatName={setSelectedChatName}
                                    latestMessage={chat.latestMessage?.content || "start chatting"}
                                    latestMessageSender={
                                        chat.latestMessage?
                                        auth.id ===
                                        chat.latestMessage.sender._id
                                            ? "You"
                                            : chat.latestMessage.sender.name
                                        : ""
                                    }
                                />
                            ))}
                        {chats.length === 0 && (
                            <ListItemText primary="No results" />
                        )}
                    </List>
                </Box>
            )}
            {loading && <p>loadin.......</p>}
        </>
    );
}
