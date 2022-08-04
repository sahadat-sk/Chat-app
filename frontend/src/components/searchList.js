import * as React from "react";
import List from "@mui/material/List";
import ListItem from "./listItem.js";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AxoisPrivate from "../hooks/useAxiosPrivate.js";
import { useState, useEffect } from "react";
import { Box, Menu } from "@mui/material";

export default function AlignItemsList({ anchorEl, setAnchorEl, search }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // const [anchorEl, setAnchorEl] = React.useState(null);
   

    const axios = AxoisPrivate();

    useEffect(() => {
        setLoading(true);
        const setData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/users?search=" + search);
                setUsers(data);
                //console.log(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        setData();
    }, [search]);

    return (
        <>
            {!loading && (
                <Box
                    sx={{
                        width: "100%",
                        
                        backgroundColor: "background.paper",
                        position: "absolute",
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
