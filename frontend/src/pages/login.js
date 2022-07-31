import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "axios";
import useAuth from '../hooks/useAuth.js'

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
        userRef.current.focus();
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
        <section>
            <p>{errMsg}</p>
            <h1 className="heading">Log In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" ref={userRef}>
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className={emailFocused ? "focused" : ""}
                    placeholder="Enter your email here"
                    required
                    autoComplete="off"
                />

                <br />
                <label htmlFor="password">password:</label>
                <input
                    type="password"
                    id="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    onFocus={() => setPwdFocused(true)}
                    onBlur={() => setPwdFocused(false)}
                    className={pwdFocused ? "focused" : ""}
                    placeholder="Enter a secure password"
                    required
                    autoComplete="off"
                />

                <br />

                <button>Log In</button>
            </form>
            <p>New User ? <Link to="/register">Register</Link></p>
        </section>
    );
};

export default Login;
