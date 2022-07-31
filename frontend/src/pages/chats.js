import React, { useState } from "react";

import Navbar from "../components/navbar.js";
import Dialog from "../components/dialog.js";
import SearchList from "../components/searchList.js";

const Chats = () => {
    //console.log(auth);
    const [showModal, setShowModal] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    return (
        <div className="ChatsContainer">
            <Navbar
                showModal={showModal}
                setShowModal={setShowModal}
                setShowSearch={setShowSearch}
                setAnchorEl={setAnchorEl}
            />
            <Dialog showModal={showModal} setShowModal={setShowModal} />
            {true && (
                <SearchList anchorEl={anchorEl} setAnchorEl2={setAnchorEl} />
            )}
        </div>
    );
};

export default Chats;
