import React, { useState } from "react";

import Navbar from "../components/navbar.js";
import Dialog from "../components/dialog.js";
import SearchList from "../components/searchList.js";
import Recent from "../components/recent.js";
import Messages from "../components/messages.js";
import { Stack } from "@mui/material";

const Chats = () => {
    //console.log(auth);
    const [showModal, setShowModal] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState("");

    return (
        <div className="ChatsContainer">
            <Navbar
                showModal={showModal}
                setShowModal={setShowModal}
                setShowSearch={setShowSearch}
                setSearch={setSearch}
            />
            <Dialog showModal={showModal} setShowModal={setShowModal} />
            {showSearch && <SearchList position="absolute" search={search} />}
            <Stack
                direction={["column", "column", "row"]}
                sx={{
                    height: "90%",
                }}
                p={1}
                gap={1}
            >
                <Recent />
                <Messages />
            </Stack>
        </div>
    );
};

export default Chats;
