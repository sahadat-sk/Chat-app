import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
    Typography,
    ListItem,
    Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import AxoisPrivate from "../../hooks/useAxiosPrivate.js";

const GroupDialog = ({ showModal, setShowModal }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [chatName,setChatName] = useState("");

    // const [anchorEl, setAnchorEl] = React.useState(null);

    const axios = AxoisPrivate();

    useEffect(() => {
        setLoading(true);
        const setData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/users?search=" + search);
                setUsers(data);
                //console.log("add to group", data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        if (search !== "") setData();
    }, [search]);

    const handleClose = () => {
        setShowModal(false);
        setSearch("");
        setSelectedUsers([]);
    };

    const handleCreate = () => {
        setShowModal(false);
        setSearch("");
        setSelectedUsers([]);
        setChatName("");
        let users = selectedUsers.map((user) => user.userId);
        const createGroup = async () => {
            try {
                const { data } = await axios.post("/chats/newgroupchat", {
                    users: JSON.stringify(users),
                    chatName,
                });
            } catch (err) {
                console.error(err);
            }
        };
        createGroup();
    };

    const handleClick = (username, userId) => {
        if (
            selectedUsers.filter(
                (selecteduser) => selecteduser.userId === userId
            ).length === 0
        ) {
            setSelectedUsers([...selectedUsers, { username, userId }]);
        }
        setSearch("");
        // console.log(selectedUsers);
    };
    const handleDelete = (userId) => {
        setSelectedUsers(
            selectedUsers.filter(
                (selecteduser) => selecteduser.userId !== userId
            )
        );
    };

    return (
        <Dialog open={showModal} onClose={handleClose}>
            <DialogTitle>Create Group</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {selectedUsers.length > 0 &&
                        selectedUsers
                            .slice(0, 3)
                            .map((user) => (
                                <Chip
                                    label={user.username}
                                    onDelete={() => handleDelete(user.userId)}
                                    color="primary"
                                />
                            ))}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Group Name"
                    type="email"
                    fullWidth
                    variant="standard"
                    value = {chatName}
                    onChange = {(e) => setChatName(e.target.value)} 
                />
                <TextField
                    margin="dense"
                    label="Add users"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <List>
                    {users.length > 0 &&
                        search !== "" &&
                        users.slice(0, 3).map((user) => (
                            <ListItem
                                onClick={() => handleClick(user.name, user._id)}
                            >
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={user.name}
                                            src="/static/images/avatar/1.jpg"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.name}
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
                        ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GroupDialog;
