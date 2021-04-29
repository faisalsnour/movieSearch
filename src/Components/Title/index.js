import React from 'react'
import "./style.css"

function Title(props) {
    return (
        <div className="container">
            <h1>{props.title}</h1>
        </div>
    )
}

export default Title