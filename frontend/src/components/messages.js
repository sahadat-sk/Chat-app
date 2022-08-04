import {
    Box,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Messages = ({selectedChat}) => {
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
                {selectedChat}
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    height: "84%",
                    backgroundColor: "#eceff1",
                }}
            >
                {selectedChat === "" && ("nothing to display")}
            </Box>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    variant="outlined"
                    size="small"
                />
            </FormControl>
        </Box>
    );
};

export default Messages;
