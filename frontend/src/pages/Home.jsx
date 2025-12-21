import React, { useEffect, useState } from 'react'
import api from '../api';
import '../styles/Home.css';

export const Home = ({ pageTitle }) => {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [statusMsg, setStatusMsg] = useState("");

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api.get("/api/notes")
            .then(res => res.data)
            .catch(err => alert(err))
    }

    const deleteNotes = (id) => {
        api.delete(`/api/notes/delete/${id}`).then(res => {
            if (res.status == 204) {
                setStatusMsg("Note deleted.")
            } else {
                setStatusMsg("Failed to delete note.")
            }
        })
    }

    const createNotes = (e) => {
        api.post("/api/notes/",
            { content, title }).then((res) => {

            })

        getNotes();
    }

    const logoutHandler = () => {

    }

    return (
        <div className='home-page-wrapper'>
            <div className='header-container'>
                <div className='left-header-wrap'>
                    <h1>Home</h1>
                    <div>{pageTitle}</div>
                </div>
                <div className='right-header-wrap'>
                    <button className={"logout-btn"} onClick={logoutHandler}>
                        Logout
                    </button>
                </div>
            </div>
            <div className='home-body-container'>
                <div><h2>Notes</h2></div>
                <div className='notes-container'>
                    <h3>Create Notes</h3>
                    <form onSubmit={createNotes}>
                        <label>Title:</label>
                        <input
                            type={'text'}
                            id={"title-notes"}
                            name='title'
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <label>Content:</label>
                        <textarea
                            id={`text-content-area`}
                            name='content'
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <input type="submit" value={"Submit"}></input>
                    </form>
                </div>
            </div>
        </div>
    )
}
