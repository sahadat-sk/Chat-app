import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import RecentSearch from "./recentSearchList";

const Recent = () => {
  return (
      <Box
          sx={{
              width: "30%",
              height: "100%",
              backgroundColor: "background.paper",
          }}
      >
          <Stack
              direction="row"
              gap={2}
              p={2}
              justifyContent="space-between"
              alignItems="center"
          >
              <Typography variant="h5">Recent Chats</Typography>
              <Button variant='outlined'>Create Group Chat</Button>
          </Stack>
          <RecentSearch />
      </Box>
  );
}

export default Recent