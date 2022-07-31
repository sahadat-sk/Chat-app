import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Typography,
} from "@mui/material";
import React from "react";

export default ({name,handleClick}) => {
    console.log("HEllo guys")
    return (
        <MenuItem onClick={handleClick}>
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
        </MenuItem>
    );
}
