import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import RecentSearch from "./recentSearchList";
import AddIcon from "@mui/icons-material/Add";

const Recent = ({
    setSelectedChat,
    setSelectedChatName,
    setNewGroup,
    setIsGroupChat,
    reRenderChats,
}) => {
    const handleOpen = () => {
        setNewGroup(true);
    };
    return (
        <Box
            // sx={{
            //     width: "30%",
            //     height: "100%",
            //     backgroundColor: "#eceff1",
            //     padding: ".3rem",
            // }}
            sx={{
                position: "absolute",
                width: "25vw",
                height: "90vh",
                // left: "20px",
                //top: "116px",

                background: "white",
            }}
        >
            <Stack
                direction="row"
                // gap={2}
                p={2}
                justifyContent="space-between"
                alignItems="center"
                backgroundColor="#F5F5F5"
                //borderBottom={.5}
                //mb={0.3}
            >
                <Typography variant="h5" sx={{fontWeight:"bold"}}>Recent Chats</Typography>
                {/* <Button variant="outlined" onClick={handleOpen}>
                    Create Group Chat
                </Button> */}
                <IconButton onClick={handleOpen} color="primary">
                    <AddIcon fontSize="large" variant="filled" />
                </IconButton>
            </Stack>
            <RecentSearch
                setSelectedChat={setSelectedChat}
                setSelectedChatName={setSelectedChatName}
                setIsGroupChat={setIsGroupChat}
                reRenderChats={reRenderChats}
            />
        </Box>
    );
};

export default Recent;
