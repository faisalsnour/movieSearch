import React from 'react'
import "./style.css"

function Title(props) {
    return (
        <div className="container">
            <h1 style={{ color: "#018060", marginTop: "30px" }}>{props.title}</h1>
        </div>
    )
}

export default Title