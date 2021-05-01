import React from 'react'
import "./style.css"
import Movie from "../../Components/Movie"
import axios from "axios";
import Search from "../Search"

class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchWord: "",
            listMovie: [],
            names: [{ name: "bobobo", Age: "20" }, "sam", "bobo"]
        }
    }
    getMovies = () => {

        return axios.get(`http://www.omdbapi.com/?apikey=254de20d&s=${this.state.searchWord}`).then(response => {
            console.log(response.data.Search)
            // console.log(this.state.names)
            this.setState({ listMovie: response.data.Search })
            // console.log(this.state.listMovie[0].Title)
        })
    }
    // componentDidMount() {
    //     this.getMovies()
    // }

    handleChange = async (event) => {
        await (this.setState({ searchWord: event.target.value }))
        console.log(this.state.searchWord)
        this.getMovies()

    }

    render() {
        return (
            <>
                <div className="container">
                    <Search handleInputChange={this.handleChange} />
                    <div className="row">
                        <div id="results" className="col" style={{ backgroundColor: "grey" }}>
                            <p>Result for ""</p>


                        </div>
                        <div id="nominations" className="col">
                            <p>Nomination</p>
                            <Movie name="abc" year="1999" message="Nominations" />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default Results