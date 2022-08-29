import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    MenuItem,
    Typography,
} from "@mui/material";
import React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth.js"

export default ({
    name,
    userId,
    setSelectedChat,
    setSelectedChatName,
    latestMessage,
    latestMessageSender,
    latestMessageId,
    isRead,
    isGroup,
    setIsGroupChat
}) => {
    const {auth} = useAuth();
    const axios = useAxiosPrivate();
    const handleClick = () => {
        setSelectedChat(userId);
        setSelectedChatName(name);
        if(latestMessageId){
            setIsGroupChat(isGroup);
            axios.put("/messages/readby", {
                messageId: latestMessageId,
                userId: auth.id,
            });
        }
    };

    return (
        <ListItem
            onClick={handleClick}
            sx={{
                backgroundColor: "background.paper",
                //marginBottom: ".1rem",
                width: "100%",
            }}
        >
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar alt={name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={
                        <>
                            <Typography variant="body2"
                            component="span">
                                {latestMessageSender}{" "}
                            </Typography>
                            <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color= {isRead?"text.primary":"green"}

                            >
                                {latestMessage}
                            </Typography>
                        </>
                    }
                />
            </ListItemButton>
        </ListItem>
    );
};
