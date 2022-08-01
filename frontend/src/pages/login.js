import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "axios";
import useAuth from '../hooks/useAuth.js'
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const Login = () => {

    const {setAuth} = useAuth();

    const userRef = useRef();

    const [pwd, setPwd] = useState("");
    const [pwdFocused, setPwdFocused] = useState(false);

    const [email, setEmail] = useState("");
    const [emailFocused, setEmailFocused] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    
    const LOGIN_URL = "http://localhost:5000/login";

    useEffect(() => {
       // userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    },[pwd, email]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email, password:pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            const accessToken = response?.data?.accessToken;
            setAuth({name:response?.data?.name,email,accessToken});
            
            setEmail("");
            setPwd("");
            navigate("/chats", { replace: true });
            //console.log(accessToken)
            
        }catch(err){
            //console.log(err);
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }

        }
    }
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
                            Log In
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                               
                                <TextField
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                    className={emailFocused ? "focused" : ""}
                                    label="Email"
                                    autoComplete="off"
                                />

                                <br />
                                
                                <TextField
                                    type="password"
                                    id="password"
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    onFocus={() => setPwdFocused(true)}
                                    onBlur={() => setPwdFocused(false)}
                                    className={pwdFocused ? "focused" : ""}
                                    label="Password"
                                    
                                    autoComplete="off"
                                />

                                <br />

                                 <Button
                                    size="large"
                                    width="20rem"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >Log In</Button>
                            </Stack>
                        </form>
                        <Typography mt={2}>
                            New User ? <Link to="/register">Register</Link>
                        </Typography>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Login;
