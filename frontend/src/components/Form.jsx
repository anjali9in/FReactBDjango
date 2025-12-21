import React, { useState } from 'react'
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

export const Form = ({ route, method }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const errorObjectToString = (errorObj) => {
        if (!errorObj || typeof errorObj !== "object") return "";

        return Object.entries(errorObj)
            .map(([field, messages]) => {
                if (Array.isArray(messages)) {
                    return `${field}: ${messages.join(", ")}`;
                }
                return `${field}: ${messages}`;
            })
            .join(" | ");
    };

    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        let response;
        try {
            response = await api.post(route, { username, password })

            if (response) {
                if (method === "login") {
                    localStorage.setItem(ACCESS_TOKEN, response.data.access)
                    localStorage.setItem(REFRESH_TOKEN, response.data.refrsh);
                    navigate("/")
                } else {
                    navigate("/login")
                }
            }
        } catch (error) {
            if (error?.response?.data) {
                const errorResponse = error?.response?.data ?? [];
                console.log("errorResponse:", errorResponse)
                let msg;
                if (typeof errorResponse.detail === "string") {
                    msg = errorResponse.detail;
                }
                if (typeof errorResponse === "object") {
                    msg = errorObjectToString(errorResponse)
                }
                setErrorMsg(msg);
            }
            // alert(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='form-container' onSubmit={submitHandler}>
            <h1>{name}</h1>
            <input
                className='input-form'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
            />
            <input
                className='input-form'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />
            {errorMsg && <div className='error-red-line'>{errorMsg}</div>}
            <button type={"submit"} className='button-submit-form' disabled={loading}>
                {name}
            </button>
        </form>
    )
}
