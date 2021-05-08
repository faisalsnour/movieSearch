import React from 'react'
import "./style.css"
import axios from "axios";
import Modal from '../Modal'
import Title from '../Title'
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
            // Nominated: false
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

        return axios.get(`http://www.omdbapi.com/?apikey=254de20d&type=movie&s=${this.state.searchWord}`).then(response => {
            console.log(response.data.Search)
            // console.log(this.state.names)

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
                // console.log(this.state.listMovie[0].Title)
            }
        })
    }


    reloadMovies = (search) => {

        return axios.get(`http://www.omdbapi.com/?apikey=254de20d&s=${search}`).then(response => {
            console.log(response.data.Search)
            // console.log(this.state.names)

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
                // console.log(this.state.listMovie[0].Title)
            }
        })
    }

    showBanner = () => {
        return <div class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
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
                // this.showBanner()
                alert("you have already nominated 5 movies, delete movies to nominate")

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
                    if (newLocalStorageValue.length === 5) {
                        this.showModal()
                    }
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
            return <button style={{ position: "absolute", right: "7px" }} type="button" className="btn btn-success rounded-0 btnNominate"
                onClick={this.changeStatus} value={movie.imdbID}>
                {/* {movie.Nominated ? "Nominated" : "Nominate"} */}
                Nominate
            </button>
        }
        else {
            return <button style={{ position: "absolute", right: "7px" }} disabled type="button" className="btn btn-success rounded-0 btnNominate"
                onClick={this.changeStatus} value={movie.imdbID}>
                {/* {movie.Nominated ? "Nominated" : "Nominate"} */}
                Nominated
            </button>
        }
    }

    displayMovies = () => {

        let contents = "";

        if (this.state.listItems !== undefined && this.state.listItems.length >= 0) {

            // -----------------------------------------------------------------
            // add if to check between the list here and localStorage ..........
            if (localStorage.listOfNominatedMovies !== undefined) {
                let NominatedArray = JSON.parse(localStorage.getItem("listOfNominatedMovies"));
                let localMovieID = []
                NominatedArray.forEach(element => {
                    localMovieID.push(element.imdbID)
                });

                console.log(`[NominatedArray]`, NominatedArray)
                console.log(`xxx`, localMovieID)

                // this.setState({
                //     listMovie: this.state.listMovie.map(movie => {
                //         NominatedArray.map(localMovie => {
                //             if (localMovie.imdbID === movie.imdbID) {
                //                 return { ...movie, Nominated: true }
                //             }
                //             return movie
                //         })
                //         return movie
                //     })
                // })

                console.log(`[localMovieID]`, localMovieID.find(el => el === "tt0489270"));

                this.setState({
                    listMovie: this.state.listMovie.map(movie => {
                        if ((localMovieID.find(el => el === movie.imdbID)) === movie.imdbID) {
                            console.log("got one!!")
                            return { ...movie, Nominated: true }
                        }
                        return movie
                    })
                })

                // this.setState({
                //     listMovie: this.state.listMovie.map(movie => {
                //         if (movie.imdbID === "tt1233227") {
                //             return { ...movie, Nominated: true }
                //         }
                //         return movie
                //     })
                // })

            }

            // -----------------------------------------------------------------

            // this.setState({
            //     listMovie: this.state.listMovie.map(movie => {
            //         if (movie.imdbID === "tt1233227") {
            //             return { ...movie, Nominated: true }
            //         }
            //         return movie
            //     })
            // })

            console.log(`[listMovie]`, this.state.listMovie)

            contents = this.state.listMovie.map((movie) =>
                <li key={movie.imdbID} className="list-group-item" style={{ position: "relative", paddingBottom: "20px" }}>
                    - {movie.Title} ({movie.Year})
                    {this.showButton(movie)}
                    {/* <button type="button" className="btn btn-primary rounded-0 btnNominate"
                        onClick={this.changeStatus} value={movie.imdbID}>
                        {movie.Nominated ? "Cancel" : "Nominate"}
                    </button> */}
                </li>

            )
        }
        this.setState({ listItems: contents })

    }

    handleChange = async (event) => {
        // let temp = this.state.searchValue;
        let temp = event.target.value;
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

    handleSubmit = async (event) => {
        let temp = this.state.searchValue;
        this.setState({ searchValue: temp })
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
            // console.log(`[listMovie after canceling one movie]`, this.state.listMovie)

            this.setState({
                listMovie: this.state.listMovie.map(movie => {
                    if (movieKey === movie.imdbID) {
                        console.log('moviee keyyyyyyyyyyyyyy', { ...movie, Nominated: false })

                        return { ...movie, Nominated: false }

                    }
                    return movie;

                })
            })

            console.log(`[Alllll]`, this.state.listMovie)
        }
        this.reloadMovies(this.state.searchWord)

    }

    showNominatedList() {
        if (localStorage.listOfNominatedMovies !== undefined) {

            let NominatedMovieArray = JSON.parse(localStorage.getItem("listOfNominatedMovies"));
            // to check if it returns an array
            console.log(`[NominatedMovieArray]`, NominatedMovieArray)

            let NominatedContents = "";

            NominatedContents = NominatedMovieArray.map((movie) =>
                <li key={movie.imdbID} className="list-group-item" style={{ position: "relative", paddingBottom: "20px" }}>
                    - {movie.Title} ({movie.Year})
                <button style={{ position: "absolute", right: "7px" }} type="button" className="btn btn-primary rounded-0 btnNominate"
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
                <div id="hero" className="container">
                    {/* <div id="knowMore" className="row"> */}
                    {/* <div className="col-7 col-xl-11"> */}
                    <Title title="The shoppies" />
                    <div className="container" id="searchContainer">
                        <p>Movie Title</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="flex" id="formEntries">
                                <button type="submit" className="btn btn-light rounded-0"><i className="fa fa-search fa-1x" id="searchIcon" aria-hidden="true"></i></button>
                                <input type="text" className="form-control" id="movieName" placeholder="Enter name of movie" onChange={this.handleChange} />
                            </div>
                        </form>
                    </div>
                    {/* </div> */}
                    {/* </div> */}
                </div>
                {/* end of hero section */}
                <div className="container">
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <b>Congratulations!🎉</b>
                        <p>You have nominated 5 Movies!!!</p>
                    </Modal>
                    {/* <Search handleSubmit={this.handleChange} /> */}


                    <div className="row">
                        <div id="results" className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            <p>Result for "<span style={{ color: "#018060", fontWeight: "bold" }}>{this.state.searchWord}</span>"</p>

                            < ul > {this.state.listItems}</ul >
                        </div>
                        <div id="nominations" className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
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

