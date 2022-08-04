import {
    Avatar,
    Divider,
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

export default ({ name,userId }) => {

    const axios = useAxiosPrivate();

    const handleClick = async () =>{
        try{
            const {data} = await axios.post("/chats",{userId});
            //console.log(data);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <>
            <ListItem onClick={handleClick}>
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
            <Divider />
        </>
    );
};
