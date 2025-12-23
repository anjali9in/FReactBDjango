import React, { useEffect, useState } from 'react'
import api from '../api';
import '../styles/Home.css';
import Note from '../components/Note';

export const Home = () => {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [statusMsg, setStatusMsg] = useState("");
    const [createNotes, setCreateNotes] = useState(false);

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api.get("/api/notes")
            .then(res => res.data)
            .then(data => {
                setNotes(data)
            })
            .catch(err => setStatusMsg("error occured", err))
    }

    const deleteNotes = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then(res => {
            if (res.status == 204) {
                setStatusMsg("Note deleted.")
                setNotes((prevNotes) =>
                    prevNotes.filter(note => note.id !== id)
                );
                setTimeout(() => {
                    setStatusMsg("");
                }, 1000)
            } else {
                setStatusMsg("Failed to delete note.")
            }
        })
    }

    const createNotesHandler = (e) => {
        e.preventDefault();
        api.post("/api/notes/",
            { content, title }).then((res) => {

            })

        getNotes();
        setCreateNotes(false);
    }

    const logoutHandler = () => {

    }

    return (
        <div className='home-page-wrapper'>
            <div className='header-container'>
                <div className='left-header-wrap'>
                    <h1>Home</h1>
                </div>
                <div className='right-header-wrap'>
                    <button className={"logout-btn"} onClick={logoutHandler}>
                        Logout
                    </button>
                </div>
            </div>
            <div className='home-body-container'>
                <div>
                    {statusMsg &&
                        statusMsg !== "" &&
                        <div className='status-alert'>{statusMsg}</div>
                    }
                    <div className='note-head-container'>
                        <h2>Notes</h2>
                        <button className={"create-note-btn"} onClick={() => setCreateNotes(true)}>
                            CREATE NOTES
                        </button>
                    </div>
                    {notes?.map(note => {
                        return <Note
                            key={note.id}
                            note={note}
                            onDelete={() => deleteNotes(note.id)}
                        />
                    })}
                </div>
                {createNotes && <div className='notes-container'>
                    <h3>New Notes</h3>
                    <form onSubmit={createNotesHandler}>
                        <label htmlFor='title'>Title:</label>
                        <input
                            type={'text'}
                            id={"title-notes"}
                            name='title'
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <label htmlFor='content'>Content:</label>
                        <textarea
                            id={`text-content-area`}
                            name='content'
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <input type="submit" value={"Submit"}></input>
                    </form>
                </div>}
            </div>
        </div>
    )
}
