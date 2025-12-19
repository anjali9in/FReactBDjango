import React, { useState } from 'react'
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';

export const Form = ({ route, method }) => {

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await api.post(route, { userName, password })
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
            alert(error)
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
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Username'
            />
            <input
                className='input-form'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />
            <button type={"submit"} onClick={"button-sumit-form"}>
                {name}
            </button>
        </form>
    )
}
