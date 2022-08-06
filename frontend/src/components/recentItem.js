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

export default ({ name, userId,setSelectedChat,setSelectedChatName }) => {
    
    const handleClick = ()=>{    
        setSelectedChat(userId);
        setSelectedChatName(name);
    }
   

    return (
        <ListItem onClick={handleClick}sx={{
            backgroundColor: "background.paper",
            marginBottom: ".1rem",
            width: "100%",
        }}>
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar alt={name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={
                        <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Ali Connors
                        </Typography>
                    }
                />
            </ListItemButton>
        </ListItem>
    );
};
