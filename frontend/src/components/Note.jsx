import React from 'react'

const Note = ({ note, onDelete }) => {

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")
    return (
        <div className='notes-container note'>
            <div className='title-content-wrap'>
                <h3>{note.title}</h3>
                <p className='content'>{note.content}</p>
            </div>
            <div className='date-btn-wrap'>
                <div>{formattedDate}</div>
                <button className='delete-note-btn' onClick={onDelete}>DELETE</button>
            </div>
        </div>
    )
}

export default Note