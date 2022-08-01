import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "axios";
import useAuth from "../hooks/useAuth.js";
import { Paper, TextField, Typography ,Box,Button, Stack} from "@mui/material";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGISTER_URL = "http://localhost:5000/register";

const Register = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const userRef = useRef();

    const [user, setUser] = useState("");
    const [validUser, setValidUser] = useState(false);
    const [userFocused, setUserFocused] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocused, setPwdFocused] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocused, setMatchPwdFocused] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        if (user.length > 0) {
            setValidUser(USER_REGEX.test(user));
            // console.log("User not valid", USER_REGEX.test(user));
        }
    }, [user]);

    useEffect(() => {
        if (pwd.length > 0) {
            setValidPwd(PWD_REGEX.test(pwd));
        }
    }, [pwd]);

    useEffect(() => {
        if (email.length > 0) {
            setValidEmail(EMAIL_REGEX.test(email));
        }
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatchPwd(pwd === matchPwd);
    }, [pwd, matchPwd]);
    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, email, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted");
        if (!validUser || !validEmail || !validMatchPwd || !validPwd){
            setErrMsg("Invalid Input");
            console.log("Invalid Input");
            return;
        }
            try {
                const response = await axios.post(
                    REGISTER_URL,
                    JSON.stringify({
                        name: user,
                        email,
                        password: pwd,
                        pic: "no pic",
                    }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                const accessToken = response?.data?.accessToken;
                setAuth({ name: user, email, accessToken });

                setEmail("");
                setPwd("");
                setMatchPwd("");
                setUser("");

                navigate("/chats", { replace: true });
            } catch (err) {
                if (!err?.response) {
                    setErrMsg("No Server Response");
                } else if (err.response?.status === 409) {
                    setErrMsg("Username Taken");
                } else {
                    setErrMsg("Registration Failed");
                }
            }
    };

    return (
        <>
            <div className="main">
                <div className="image"></div>
                <div className="form_container">
                    <Box
                        p={10}
                        height="100%"
                        width="60%"
                        backgroundColor="white"
                    >
                        <Typography>{errMsg}</Typography>
                        <Typography variant="h4" align="left" gutterBottom>
                            Register
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    onFocus={() => setUserFocused(true)}
                                    onBlur={() => setUserFocused(false)}
                                    
                                    required
                                    autoComplete="off"
                                    label="Username"
                                    helperText={
                                        !validUser && user.length > 0
                                            ? "Username must be 4 to 24 characters long"
                                            : ""
                                    }
                                    error={!validUser && user.length > 0}
                                />

                                <TextField
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                    required
                                    autoComplete="off"
                                    label="Email"
                                    
                                    helperText={
                                        !validEmail && email.length > 0
                                            ? "Email must be valid"
                                            : ""
                                    }
                                    error={!validEmail && email.length > 0}
                                />

                                <TextField
                                    type="password"
                                    id="password"
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    onFocus={() => setPwdFocused(true)}
                                    onBlur={() => setPwdFocused(false)}
                                    label="Password"
                                    required
                                    autoComplete="off"
                                    
                                    helperText={
                                        !validPwd && pwd.length > 0
                                            ? "Password must be 8 to 24 characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character"
                                            : ""
                                    }
                                    error={!validPwd && pwd.length > 0}
                                />

                                <TextField
                                    type="password"
                                    id="confirm_pwd"
                                    value={matchPwd}
                                    onChange={(e) =>
                                        setMatchPwd(e.target.value)
                                    }
                                    onFocus={() => setMatchPwdFocused(true)}
                                    onBlur={() => setMatchPwdFocused(false)}
                                    label="Confirm Password"
                                    required
                                    autoComplete="off"
                                    
                                    helperText={
                                        !validMatchPwd && matchPwd.length > 0
                                            ? "Passwords must match"
                                            : ""
                                    }
                                    error={
                                        !validMatchPwd && matchPwd.length > 0
                                    }
                                />

                                <Button
                                    size="large"
                                    width="20rem"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Sign Up
                                </Button>
                            </Stack>
                        </form>
                        <Typography mt={2}>
                            Already a user ? <Link to="/">Log in</Link>
                        </Typography>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Register;
