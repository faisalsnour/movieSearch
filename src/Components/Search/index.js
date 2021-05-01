import React from 'react';
import "./style.css";

function Search(props) {
    return (
        <>
            <div className="container" id="searchContainer">
                <p>Movie Title</p>

                <div className="flex">
                    <button type="button" className="btn btn-light rounded-0"><i className="fa fa-search fa-1x" id="searchIcon" aria-hidden="true"></i></button>
                    <input type="text" className="form-control" id="movieName" placeholder="Enter name of movie" onChange={props.handleInputChange} />
                </div>
            </div>
        </>
    )
}


export default Search