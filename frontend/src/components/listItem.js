import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Typography,
} from "@mui/material";
import React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";

export default ({ name, userId,reRenderChats,setReRenderChats }) => {
    const axios = useAxiosPrivate();

    const handleClick = async () => {
        try {
            const { data } = await axios.post("/chats", { userId });
            //console.log(data);
        } catch (err) {
            console.error(err);
        }
        setReRenderChats(!reRenderChats);
    };

    return (
        <>
            <ListItem onClick={handleClick}>
                <ListItemButton sx={{ hover: {} }}>
                    <ListItemIcon>
                        <PersonIcon fontSize="medium" color="secondary"/>
                    </ListItemIcon>
                    <ListItemText primary={name} />
                    <ListItemIcon>
                        <SendIcon color="primary"></SendIcon>
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>
        </>
    );
};
