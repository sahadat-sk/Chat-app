import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGISTER_URL = "http://localhost:5000/register";

const Register = () => {
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
        <section>
            <p>{errMsg}</p>
            <h1 className="heading">Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    onFocus={() => setUserFocused(true)}
                    onBlur={() => setUserFocused(false)}
                    className={userFocused ? "focused" : ""}
                    placeholder="Enter your name here"
                    required
                    autoComplete="off"
                />
                <p
                    className={
                        user && userFocused && !validUser
                            ? "instructions"
                            : "none"
                    }
                >
                    4 to 24 characters. Must begin with a letter. Letters,
                    numbers, underscores, hyphens allowed.
                </p>
                <br />
                <label htmlFor="email">Email:</label>
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
                <p
                    className={
                        email && emailFocused && !validEmail
                            ? "instructions"
                            : "none"
                    }
                >
                    Enter a valid Email.
                </p>
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
                <p
                    className={
                        pwdFocused && !validPwd ? "instructions" : "none"
                    }
                >
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                </p>

                <br />

                <label htmlFor="confirm_pwd">confirm Password:</label>
                <input
                    type="password"
                    id="confirm_pwd"
                    value={matchPwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                    onFocus={() => setMatchPwdFocused(true)}
                    onBlur={() => setMatchPwdFocused(false)}
                    className={matchPwdFocused ? "focused" : ""}
                    placeholder="confirm your password"
                    required
                    autoComplete="off"
                />
                <p
                    className={
                        matchPwdFocused && !validMatchPwd
                            ? "instructions"
                            : "none"
                    }
                >
                    must match with the password.
                </p>
                <button
                    disabled={
                        !validUser || !validEmail || !validMatchPwd || !validPwd
                            ? true
                            : false
                    }
                >
                    Sign Up
                </button>
            </form>
            <p>
                Already a user ? <Link to="/">Log in</Link>
            </p>
        </section>
    );
};

export default Register;
