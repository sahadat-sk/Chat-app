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
    Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import AxoisPrivate from "../../hooks/useAxiosPrivate.js";

const GroupDialog = ({
    showGroupEdit,
    setShowGroupEdit,
    selectedChat,
    selectedChatName,
}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [chatName, setChatName] = useState(selectedChatName);

    // const [anchorEl, setAnchorEl] = React.useState(null);

    const axios = AxoisPrivate();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await axios.get(
                    "chats/getusers/" + selectedChat
                );
                setSelectedUsers(data.users);
                //console.log("add to group", data.users);
            } catch (err) {
                console.error(err);
            }
        };
        getUsers();
    }, [showGroupEdit]);

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
        setShowGroupEdit(false);
        setSearch("");
        setSelectedUsers([]);
    };

    const handleCreate = () => {
        setShowGroupEdit(false);
        setSearch("");
        setSelectedUsers([]);
        setChatName("");
        const createGroup = async () => {};
        createGroup();
    };

    const handleClick = (username, userId) => {
        const addUser = async () => {
            try {
                const { data } = await axios.put(
                    "chats/adduser/" ,
                    {
                        chatId: selectedChat,
                        userId,
                    }
                );
                setSelectedUsers(data.users);
            } catch (err) {
                console.error(err);
                if (err.response.status === 403) {
                    console.log("balabala");
                }
            }
        }
        addUser();
        setSearch("");
        // console.log(selectedUsers);
    };
    const handleDelete = (userId) => {
        const deleteUser = async () => {
            try {
                const { data } = await axios.put("chats/removeuser", {
                    chatId: selectedChat,
                    userId,
                });
                setSelectedUsers(data.users);
            } catch (err) {
                console.error(err);
                if(err.response.status === 403) {
                    console.log("balabala");
                }
            }
        };
        deleteUser();
    };

    return (
        <Dialog open={showGroupEdit} onClose={handleClose}>
            <DialogTitle>Edit Group</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Stack direction="row" gap={0.5}>
                        {selectedUsers.length > 0 &&
                            selectedUsers.map((user) => (
                                <Chip
                                    key={user._id}
                                    label={user.name}
                                    onDelete={() => handleDelete(user._id)}
                                    color="primary"
                                />
                            ))}
                    </Stack>
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Group Name"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
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
                    Rename
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GroupDialog;
