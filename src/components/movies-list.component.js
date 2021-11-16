import React, {Component} from "react";
import MovieDataService from "../services/movie.service";
import {Link} from "react-router-dom";

export default class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.retrieveMovies = this.retrieveMovies.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMovie = this.setActiveMovie.bind(this);

        this.state = {
            movies: [],
            currentMovie: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveMovies();
    }

    retrieveMovies() {
        MovieDataService.getAll()
            .then(response => {
                this.setState({
                    movies: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveMovies();
        this.setState({
            currentMovie: null,
            currentIndex: -1
        });
    }

    setActiveMovie(movie, index) {
        this.setState({
            currentMovie: movie,
            currentIndex: index
        });
    }

    render() {
        const {movies, currentMovie, currentIndex} = this.state;

        return (
            <div>
                <div>
                    <h4>Movies List</h4>

                    <ul>
                        {movies &&
                        movies.map((movie, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveMovie(movie, index)}
                                key={index}
                            >
                                {movie.title}
                            </li>
                        ))}
                    </ul>

                </div>
                <div>
                    {currentMovie ? (
                        <div>
                            <h4>Movies</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentMovie.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Plot:</strong>
                                </label>{" "}
                                {currentMovie.plot}
                            </div>

                            <div>
                                <label>
                                    <strong>ReleaseDate:</strong>
                                </label>{" "}
                                {currentMovie.releaseDate}
                            </div>


                            <Link
                                to={"/movies/" + currentMovie.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a movie...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}