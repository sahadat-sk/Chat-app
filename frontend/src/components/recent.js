import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import RecentSearch from "./recentSearchList";

const Recent = ({ setSelectedChat,setSelectedChatName }) => {
    return (
        <Box
            sx={{
                width: "30%",
                height: "100%",
                backgroundColor: "#eceff1",
                padding: ".3rem",
            }}
        >
            <Stack
                direction="row"
                gap={2}
                p={2}
                justifyContent="space-between"
                alignItems="center"
                backgroundColor="background.paper"
                mb={0.3}
            >
                <Typography variant="h5">Recent Chats</Typography>
                <Button variant="outlined">Create Group Chat</Button>
            </Stack>
            <RecentSearch setSelectedChat={setSelectedChat} setSelectedChatName={setSelectedChatName}/>
        </Box>
    );
};

export default Recent