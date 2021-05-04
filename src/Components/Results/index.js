import React from 'react'
import "./style.css"
import axios from "axios";
// import Search from "../Search"
// import Moviee from "../../Components/Moviee"

class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchWord: "",
            searchValue: "",
            listMovie: [],
            temporaryList: [],
            MovieStatus: "Nominate",
            listItems: "",
            listNominated: "",
            TargetedMovie: Object
            // Nominated: false
        }
    }


    componentDidMount() {
        this.showNominatedList()
    }

    getMovies = () => {

        return axios.get(`http://www.omdbapi.com/?apikey=254de20d&s=${this.state.searchWord}`).then(response => {
            console.log(response.data.Search)
            // console.log(this.state.names)

            // temporary list to add new property to objects (movies)
            this.setState({ temporaryList: response.data.Search })
            this.setState({
                temporaryList: this.state.temporaryList.map(movie => ({
                    ...movie, Nominated: false
                }))
            })

            // after adding Nominated property to Movie, add it to ListMovie
            this.setState({ listMovie: this.state.temporaryList })

            // just to test if the new property has been added
            console.log(`this is listMovie`, this.state.listMovie[0].Nominated)
            this.displayMovies()
            // console.log(this.state.listMovie[0].Title)
        })
    }



    changeStatus = (event) => {
        event.preventDefault();

        // check if localStorage exists first, if undefined execute the code, if not check the how many movies are listed already in LocalStorage
        if (localStorage.listOfNominatedMovies === undefined) {
            console.log("this function is rendered")
            const movieKey = event.target.value;
            console.log(`[movie key]:`, movieKey)

            this.state.listMovie.forEach(item => {
                if (item.imdbID === movieKey) {
                    console.log(`item id`, item.imdbID, `[item nominated value before change]`, item.Nominated)
                }
            })

            setTimeout(() => {
                this.toggleButtonValue(movieKey)
            }, 2000);
        }
        else // check the how many movies already exist in localStorage
        {

            let currentLocalStorage = JSON.parse(localStorage.getItem("listOfNominatedMovies"));
            if (currentLocalStorage.length <= 4) {
                console.log("this function is rendered")
                const movieKey = event.target.value;
                console.log(`[movie key]:`, movieKey)

                this.state.listMovie.forEach(item => {
                    if (item.imdbID === movieKey) {
                        console.log(`item id`, item.imdbID, `[item nominated value before change]`, item.Nominated)
                    }
                })

                setTimeout(() => {
                    this.toggleButtonValue(movieKey)
                }, 2000);
            }
            else {
                alert('You cannot exceed 5 nominated movie, please delete to add more')
            }

        }

    }

    addToNominatedList = movieID => {

        let newItem;
        // To look for and return matching movie from the list
        this.state.listMovie.forEach(movie => {
            if (movie.imdbID === movieID) {
                newItem = movie
            }
        })

        // Add the object found to TargetedMovie
        this.setState({ TargetedMovie: newItem })
        console.log(`[Value of TargetedMovie]:`, this.state.TargetedMovie)

        console.log(`[newItem to be added]`, movieID)

        // Add TargetedMovie object into an array and save in LocalStorage
        if (this.state.TargetedMovie.Nominated === true) {
            // check first if localStorage DOES NOT exists, if not create LocalStorage and add the value of TargetedMovie
            if (localStorage.listOfNominatedMovies === undefined) {
                console.log("localStorage does not exit")
                let nominatedMovie = [];
                nominatedMovie.push(this.state.TargetedMovie)
                localStorage.setItem("listOfNominatedMovies", JSON.stringify(nominatedMovie));
            }
            else // if localStorage exists, obtain the value of LocalStorage and then add new movie to it
            {
                console.log("localStorage DOES exit")
                let newLocalStorageValue = [];
                let oldLocalStorageValue = JSON.parse(localStorage.getItem("listOfNominatedMovies"));
                console.log(`[Length of oldLocalStorageValue]:`, oldLocalStorageValue.length)
                // check if localStorage already has 5 nominated movies
                if (oldLocalStorageValue.length <= 4) {
                    console.log(`[type of oldLocalStorageValue]:`, typeof (oldLocalStorageValue))
                    oldLocalStorageValue.forEach(item => {
                        newLocalStorageValue.push(item)
                    })

                    newLocalStorageValue.push(this.state.TargetedMovie)
                    // localStorage.clear()
                    localStorage.setItem("listOfNominatedMovies", JSON.stringify(newLocalStorageValue));
                    // after new movie is added to localStorage run the below function to update nominated list
                    this.showNominatedList()
                    console.log(`[LocalStorageValue length]`, newLocalStorageValue.length)
                }
                else {
                    alert('You cannot exceed 5 nominated movie, please delete to add more')
                }

            }

        }
        else {
            let tempLocalStorage = JSON.parse(localStorage.getItem("listOfNominatedMovies"));
            console.log(`[tempLocalStorage]:`, typeof (tempLocalStorage))
            let LocalStorageArray = [];
            LocalStorageArray.push(tempLocalStorage)
            console.log(`[Length of LocalStorageArray]:`, LocalStorageArray.length)

        }
        this.showNominatedList()
    }

    toggleButtonValue = movieID => {

        this.setState({
            listMovie: this.state.listMovie.map(movie => {
                if (movieID === movie.imdbID) {
                    return { ...movie, Nominated: !movie.Nominated }

                }
                return movie;
            })
        })

        // below is to just make sure the value Nominated for item has been changed
        this.state.listMovie.forEach(item => {
            if (item.imdbID === movieID) {
                console.log(`item id`, item.imdbID, `[item nominated value after change]`, item.Nominated)
            }
        })

        this.displayMovies()
        this.addToNominatedList(movieID)
    }

    // this function is used to enable & disable button on Result section
    showButton(movie) {
        if (movie.Nominated === false) {
            return <button type="button" className="btn btn-primary rounded-0 btnNominate"
                onClick={this.changeStatus} value={movie.imdbID}>
                {movie.Nominated ? "Nominated" : "Nominate"}
            </button>
        }
        else {
            return <button disabled type="button" className="btn btn-primary rounded-0 btnNominate"
                onClick={this.changeStatus} value={movie.imdbID}>
                {movie.Nominated ? "Nominated" : "Nominate"}
            </button>
        }
    }

    displayMovies = () => {

        let contents = "";

        if (this.state.listMovie !== undefined && this.state.listMovie.length >= 0) {

            // add if to check between the list here and localStorage ..........

            contents = this.state.listMovie.map((movie) =>
                <li key={movie.imdbID} className="list-group-item">
                    - {movie.Title} ({movie.Year})
                    {this.showButton(movie)}
                    {/* <button type="button" className="btn btn-primary rounded-0 btnNominate"
                        onClick={this.changeStatus} value={movie.imdbID}>
                        {movie.Nominated ? "Cancel" : "Nominate"}
                    </button> */}
                </li>

            )
            console.log(`this is listItems`, this.state.listItems)
        }
        this.setState({ listItems: contents })

    }

    handleChange = async (event) => {
        await (this.setState({ searchValue: event.target.value }))
        console.log(`searchValue = `, this.state.searchValue)
        console.log(`searchWord = `, this.state.searchWord)
    }

    handleSubmit = async (event) => {
        let temp = this.state.searchValue;
        await this.setState({ searchWord: temp })
        console.log(`searchWord = `, this.state.searchWord)
        if (this.state.searchWord !== "") {
            console.log("aaa")

            this.getMovies()
        }
        else {
            console.log("xxx")
        }
        event.preventDefault();

    }

    cancelMovie() {

    }

    showNominatedList() {
        if (localStorage.listOfNominatedMovies !== undefined) {

            let NominatedMovieArray = JSON.parse(localStorage.getItem("listOfNominatedMovies"));
            // to check if it returns an array
            console.log(`[NominatedMovieArray]`, NominatedMovieArray)

            let NominatedContents = "";

            NominatedContents = NominatedMovieArray.map((movie) =>
                <li key={movie.imdbID} className="list-group-item">
                    - {movie.Title} ({movie.Year})
                <button type="button" className="btn btn-primary rounded-0 btnNominate"
                        onClick={this.cancelMovie} value={movie.imdbID}>
                        Cancel
                    </button>
                </li>

            )
            this.setState({ listNominated: NominatedContents })

        }
    }

    render() {
        return (
            <>
                <div className="container">
                    {/* <Search handleSubmit={this.handleChange} /> */}
                    <div className="container" id="searchContainer">
                        <p>Movie Title</p>

                        <form onSubmit={this.handleSubmit}>
                            <div className="flex">
                                <button type="submit" className="btn btn-light rounded-0"><i className="fa fa-search fa-1x" id="searchIcon" aria-hidden="true"></i></button>
                                <input type="text" className="form-control" id="movieName" placeholder="Enter name of movie" onChange={this.handleChange} />
                            </div>
                        </form>
                    </div>

                    <div className="row">
                        <div id="results" className="col" style={{ backgroundColor: "grey" }}>
                            <p>Result for ""</p>

                            < ul > {this.state.listItems}</ul >
                        </div>
                        <div id="nominations" className="col">
                            <p>Nomination</p>
                            <ul>
                                {this.state.listNominated}
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default Results