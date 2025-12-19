import React from 'react'

export const NotFound = ({ msg = "The page does not exist." }) => {
    return (
        <>
            <h1>404 Not Found</h1>
            <p>{msg}</p>
        </>
    )
}
