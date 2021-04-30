import React from 'react'
import "./style.css"

function Search() {
    return (

        <div className="container" id="searchContainer">
            <p>Movie Title</p>
            {/* <i className="fa fa-search fa-2x" aria-hidden="true"></i> */}

            <div className="flex">
                <button type="button" class="btn btn-light rounded-0"><i className="fa fa-search fa-1x" id="searchIcon" aria-hidden="true"></i></button>

                <input type="email" className="form-control" id="movieName" placeholder="Enter name of movie" />
            </div>
        </div>

    )

}

{/* <div className=" col-sm-1 col-md-1 col-lg-1" style={{ backgroundColor: "red", border: "0px" }}>
                    <label for="movieName" ><i className="fa fa-search fa-2x" aria-hidden="true"></i>
                    </label>
                </div>
                <div className="col-sm-11 col-md-11 col-lg-11">
                    <input type="email" className="form-control" id="movieName" placeholder="name@example.com" />
                </div> */}

export default Search