import * as React from "react";
import List from "@mui/material/List";
import ListItem from "./listItem.js";

import ListItemText from "@mui/material/ListItemText";

import AxoisPrivate from "../hooks/useAxiosPrivate.js";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

    
export default function AlignItemsList({ search,reRenderChats, setReRenderChats }) {
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
                        width: "21.3vw",
                        backgroundColor: "background.paper",
                        position: "absolute",
                        zIndex: 1,
                        ml:"1rem",
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}
                >
                    <List>
                        {users.length > 0 &&
                            users.map((user) => (
                                <ListItem
                                    key={user._id}
                                    name={user.name}
                                    userId={user._id}
                                    renderChats={reRenderChats}
                                    setReRenderChats={setReRenderChats}
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
