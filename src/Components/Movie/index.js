import React from 'react'
import "./style.css"

function Movie(props) {
    return (
        <div>
            <li className="list-group-item"> - {props.name} ({props.year})
            <button type="button" className="btn btn-primary rounded-0" id="btnNominate">{props.message}</button>
            </li>
        </div>
    )
}

export default Movie
