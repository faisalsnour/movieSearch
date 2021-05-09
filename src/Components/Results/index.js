import React from 'react'
import "./style.css"
import axios from "axios";
import Modal from '../Modal'
import Title from '../Title'
import Flip from 'react-reveal/Flip';
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
            TargetedMovie: Object,
            show: false
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount() {
        this.showNominatedList()
    }

    getMovies = () => {

        // to make API call
        return axios.get(`https://www.omdbapi.com/?apikey=254de20d&type=movie&s=${this.state.searchWord}`).then(response => {

            // temporary list to add new property to objects (movies)
            if (response.data.Search) {
                this.setState({ temporaryList: response.data.Search })
                this.setState({
                    temporaryList: this.state.temporaryList.map(movie => ({
                        ...movie, Nominated: false
                    }))
                })

                // after adding Nominated property to Movie, add it to ListMovie
                this.setState({ listMovie: this.state.temporaryList })

                this.displayMovies()
            }
        })
    }

    // reload list of movies after one is nominated
    reloadMovies = (search) => {

        // to make API call
        return axios.get(`https://www.omdbapi.com/?apikey=254de20d&type=movie&s=${search}`).then(response => {

            // temporary list to add new property to objects (movies)
            if (response.data.Search) {
                this.setState({ temporaryList: response.data.Search })
                this.setState({
                    temporaryList: this.state.temporaryList.map(movie => ({
                        ...movie, Nominated: false
                    }))
                })

                // after adding Nominated property to Movie, add it to ListMovie
                this.setState({ listMovie: this.state.temporaryList })

                this.displayMovies()
            }
        })
    }

    // to change the status of movie
    changeStatus = (event) => {
        event.preventDefault();

        // check if localStorage exists first, if undefined execute the code, if not check the how many movies are listed already in LocalStorage
        if (localStorage.listOfNominatedMovies === undefined) {
            const movieKey = event.target.value;

            this.state.listMovie.forEach(item => {
                if (item.imdbID === movieKey) {
                }
            })

            this.toggleButtonValue(movieKey)
            // setTimeout(() => {
            //     this.toggleButtonValue(movieKey)
            // }, 1000);
        }
        else // check the how many movies already exist in localStorage
        {
            let currentLocalStorage = JSON.parse(localStorage.getItem("listOfNominatedMovies"));
            if (currentLocalStorage.length <= 4) {
                const movieKey = event.target.value;

                this.state.listMovie.forEach(item => {
                    if (item.imdbID === movieKey) {
                    }
                })

                // this.toggleButtonValue(movieKey)

                setTimeout(() => {
                    this.toggleButtonValue(movieKey)
                }, 100);
            }
            else {
                alert("You have already nominated 5 movies, delete movies to nominate!")
            }

        }

    }

    // function to add a selected movie to nominated list
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

        // Add TargetedMovie object into an array and save in LocalStorage
        if (this.state.TargetedMovie.Nominated === true) {
            // check first if localStorage DOES NOT exists, if not create LocalStorage and add the value of TargetedMovie
            if (localStorage.listOfNominatedMovies === undefined) {
                let nominatedMovie = [];
                nominatedMovie.push(this.state.TargetedMovie)
                localStorage.setItem("listOfNominatedMovies", JSON.stringify(nominatedMovie));
            }
            else // if localStorage exists, obtain the value of LocalStorage and then add new movie to it
            {
                let newLocalStorageValue = [];
                let oldLocalStorageValue = JSON.parse(localStorage.getItem("listOfNominatedMovies"));
                // check if localStorage already has 5 nominated movies
                if (oldLocalStorageValue.length <= 4) {
                    oldLocalStorageValue.forEach(item => {
                        newLocalStorageValue.push(item)
                    })

                    newLocalStorageValue.push(this.state.TargetedMovie)
                    // localStorage.clear()
                    localStorage.setItem("listOfNominatedMovies", JSON.stringify(newLocalStorageValue));
                    // after new movie is added to localStorage run the below function to update nominated list
                    this.showNominatedList()
                    if (newLocalStorageValue.length === 5) {
                        this.showModal()
                    }
                }
                else {
                    alert('You cannot exceed 5 nominated movie, please delete to add more')
                }
            }
        }
        else {
            let tempLocalStorage = JSON.parse(localStorage.getItem("listOfNominatedMovies"));
            let LocalStorageArray = [];
            LocalStorageArray.push(tempLocalStorage)
        }
        this.showNominatedList()
    }

    // to change the value for button from nominate to nominated
    toggleButtonValue = movieID => {

        this.setState({
            listMovie: this.state.listMovie.map(movie => {
                if (movieID === movie.imdbID) {
                    return { ...movie, Nominated: !movie.Nominated }
                }
                return movie;
            })
        })

        this.displayMovies()
        this.addToNominatedList(movieID)
    }

    // this function is used to enable & disable button on Result section
    showButton(movie) {
        if (movie.Nominated === false) {
            return <button style={{ position: "absolute", right: "7px" }} type="button" name="Nominate" className="btn btn-success rounded-0 btnNominate"
                onClick={this.changeStatus} value={movie.imdbID}>
                Nominate
            </button>

        }
        else {
            return <button style={{ position: "absolute", right: "7px" }} disabled type="button" name="Nominated" className="btn btn-success rounded-0 btnNominate"
                onClick={this.changeStatus} value={movie.imdbID}>
                Nominated
        </button>

        }
    }

    // function to display searched movies
    displayMovies = () => {

        let contents = "";

        if (this.state.listItems !== undefined && this.state.listItems.length >= 0) {

            if (localStorage.listOfNominatedMovies !== undefined) {
                let NominatedArray = JSON.parse(localStorage.getItem("listOfNominatedMovies"));
                let localMovieID = []
                NominatedArray.forEach(element => {
                    localMovieID.push(element.imdbID)
                });

                this.setState({
                    listMovie: this.state.listMovie.map(movie => {
                        if ((localMovieID.find(el => el === movie.imdbID)) === movie.imdbID) {
                            return { ...movie, Nominated: true }
                        }
                        return movie
                    })
                })
            }
            contents = this.state.listMovie.map((movie) =>
                <Flip left>
                    <li key={movie.imdbID} className="list-group-item" style={{ position: "relative", paddingBottom: "20px" }}>
                        <img style={{ marginRight: "10px" }} src={movie.Poster} alt={movie.Title} width="150px" height="150px" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150" }}></img>
                        {movie.Title} ({movie.Year})
                    {this.showButton(movie)}
                    </li>
                </Flip>
            )
        }
        this.setState({ listItems: contents })
    }

    handleChange = async (event) => {
        let temp = event.target.value;
        await this.setState({ searchWord: temp })
        if (this.state.searchWord !== "") {
            this.getMovies()
        }
        event.preventDefault();
    }

    handleSubmit = async (event) => {
        let temp = this.state.searchValue;
        this.setState({ searchValue: temp })
        await this.setState({ searchWord: temp })
        if (this.state.searchWord !== "") {

            this.getMovies()
        }
        event.preventDefault();

    }

    // to delete movie from nominated list
    cancelMovie = (event) => {
        event.preventDefault();
        let movieKey = event.target.value
        let latestLocalStorage = JSON.parse(localStorage.getItem("listOfNominatedMovies"))
        latestLocalStorage.forEach(movie => {
            if (movie.imdbID === movieKey) {
                let index = latestLocalStorage.indexOf(movie)
                latestLocalStorage.splice(index, 1)
            }
        })
        localStorage.setItem("listOfNominatedMovies", JSON.stringify(latestLocalStorage));
        this.showNominatedList()

        if (this.state.listMovie !== undefined && this.state.listMovie.length >= 0) {
            this.setState({
                listMovie: this.state.listMovie.map(movie => {
                    if (movieKey === movie.imdbID) {
                        return { ...movie, Nominated: false }
                    }
                    return movie;
                })
            })
        }
        this.reloadMovies(this.state.searchWord)
    }

    // function to show and display a list of nominated movies
    showNominatedList() {
        if (localStorage.listOfNominatedMovies !== undefined) {

            let NominatedMovieArray = JSON.parse(localStorage.getItem("listOfNominatedMovies"));

            let NominatedContents = "";

            NominatedContents = NominatedMovieArray.map((movie) =>
                <Flip right>

                    <li key={movie.imdbID} className="list-group-item" style={{ position: "relative", paddingBottom: "20px" }}>
                        <img style={{ marginRight: "10px" }} src={movie.Poster} alt={movie.Title} width="150px" height="150px" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150" }}></img>

                        {movie.Title} ({movie.Year})
                    <button style={{ position: "absolute", right: "7px" }} type="button" name="Cancel" className="btn btn-success rounded-0 btnNominate"
                            onClick={this.cancelMovie} value={movie.imdbID}>
                            Cancel
                    </button>
                    </li>
                </Flip>
            )
            this.setState({ listNominated: NominatedContents })

        }
    }

    render() {
        return (
            <>
                <div id="hero" className="container">
                    <div className="row">
                        <div className="col-12">
                            <Title title="The shoppies" />
                            <div className="container" id="searchContainer">
                                <p>Movie Title</p>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="flex" id="formEntries">
                                        <button type="submit" className="btn btn-light rounded-0" name="Search"><i className="fa fa-search fa-1x" id="searchIcon" name="Search" aria-hidden="true"></i></button>
                                        <input type="text" className="form-control" id="movieName" placeholder="Enter name of movie" onChange={this.handleChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <b>🎉 Congratulations! 🎉</b>
                        <p>You have nominated 5 Movies!!!</p>
                    </Modal>
                    <div className="row">
                        <div id="results" className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            <p style={{ paddingLeft: "30px", fontWeight: "bold" }}>Result for "<span style={{ color: "#018060", fontWeight: "bold" }}>{this.state.searchWord}</span>"</p>
                            < ul > {this.state.listItems}</ul >
                        </div>
                        <div id="nominations" className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            <p style={{ paddingLeft: "30px", fontWeight: "bold" }}>Nomination</p>
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

