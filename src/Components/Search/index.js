import React from 'react';
import "./style.css";


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {

        this.setState({ searchValue: event.target.value })

    }

    // handleSubmit(event) {

    // }

    render() {
        return (
            <>
                <div className="container" id="searchContainer">
                    <p>Movie Title</p>

                    <div className="flex">
                        <form onSubmit={this.props.handleSubmit}>
                            <button type="submit" className="btn btn-light rounded-0"><i className="fa fa-search fa-1x" id="searchIcon" aria-hidden="true"></i></button>
                            <input type="text" value={this.state.searchValue} className="form-control" id="movieName" placeholder="Enter name of movie" onChange={this.handleChange} />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}


export default Search