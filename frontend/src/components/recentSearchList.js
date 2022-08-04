import * as React from "react";
import List from "@mui/material/List";
import ListItem from "./recentItem.js";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

import AxoisPrivate from "../hooks/useAxiosPrivate.js";
import { useState, useEffect } from "react";
import { Box, Menu } from "@mui/material";

export default function AlignItemsList({setSelectedChat}) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // const [anchorEl, setAnchorEl] = React.useState(null);

    const axios = AxoisPrivate();

    useEffect(() => {
        setLoading(true);
        const setData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/users/recent");
                setUsers(data);
                //console.log(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        setData();
    }, []);

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
                        {users.length > 0 &&
                            users.map((user) => (
                                <ListItem
                                    key={user._id}
                                    name={user.name}
                                    userId={user._id}
                                    setSelectedChat={setSelectedChat}
                                />
                            ))}
                        {users.length === 0 && (
                            <ListItemText primary="No results" />
                        )}
                    </List>
                </Box>
            )}
            {loading && <p>loadin.......</p>}
        </>
    );
}
