import React, {Component} from "react";
import MovieDataService from "../services/movie.service";
import {Link} from "react-router-dom";

export default class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.retrieveMovies = this.retrieveMovies.bind(this);

        this.state = {
            movies: [],
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
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {movies} = this.state;

        return (
            <div className="grid grid-cols-3 gap-4 p-4 rounded-md">
                {movies &&
                movies.map((movie) => (

                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <img className="w-full" src="https://source.unsplash.com/random/100x50"
                             alt="Sunset in the mountains"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{movie.title}</div>
                            <p className="text-gray-700 text-base">
                                {movie.plot}
                            </p>
                        </div>
                        <div className="text-right p-4">
                            <span className="text-xs text-gray-500 tracking-widest uppercase">{movie.releaseDate}</span>
                        </div>
                        <div className="px-6 pt-4 pb-2 text-center">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                                <Link
                                                                    to={"/movies/" + movie.id}
                                                                    className="badge badge-warning"
                                                                >
                                    Edit
                                </Link>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}