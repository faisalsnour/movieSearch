import React from 'react'
import "./style.css"

class Moviee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "Nominate",
            movies: [],
            listItems: ""
        }
    }



    // {
    //     Poster: "https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg",
    //     Title: "Rambo",
    //     Type: "movie",
    //     Year: "2008",
    //     imdbID: "tt0462499000"
    // },
    // {
    //     Poster: "https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg",
    //     Title: "Rambo",
    //     Type: "movie",
    //     Year: "2010",
    //     imdbID: "tt046249911223"
    // }

    // const movies = props.movies;
    // let listItems = ""
    showMovies = () => {

        let contents = "";

        if (this.state.movies !== undefined && this.state.movies.length >= 0) {

            contents = this.state.movies.map((movie) =>
                <li key={movie.imdbID} className="list-group-item">
                    - {movie.Title} ({movie.Year})
        <button type="button" className="btn btn-primary rounded-0" id="btnNominate"> {this.state.message}</button>
                </li>

            )
            console.log(`this is listItems`, this.state.listItems)
        }
        this.setState({ listItems: contents })

    }

    componentDidMount() {
        if (this.state.movies !== undefined && this.state.movies.length >= 0) {
            this.showMovies()
        }
    }


    render(
    ) {
        // this.showMovies()
        return (
            <>
                < ul > {this.state.listItems}</ul >
                <h1>Hello</h1>
            </>
        )

    }

}

export default Moviee
