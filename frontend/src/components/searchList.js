import * as React from "react";
import List from "@mui/material/List";
import MenuItem from "./listItem.js";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AxoisPrivate from "../hooks/useAxiosPrivate.js";
import { useState, useEffect } from "react";
import { Menu } from "@mui/material";

export default function AlignItemsList({anchorEl,setAnchorEl}) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

   // const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        //setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        //setAnchorEl(null);
    };

    const axios = AxoisPrivate();

    useEffect(() => {
        setLoading(true);
        const setData = async () => {
        try {
            const { data } = await axios.get("/users");
            //setUsers(data);
            console.log(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
        setData();
    }, []);



    return (
        <>
            {true && (
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={true}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    {users.map((user) => (
                        <MenuItem key={user._id} name={user.name} handleClick={handleClick}/>
                    ))}
                </Menu>
            )}
            {loading && <p>loadin.......</p>}
        </>
    );
}
