import React, { Component } from "react";
import MovieDataService from "../services/movie.service";
import {useNavigate, useParams} from "react-router-dom";

class Movie extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePlot = this.onChangePlot.bind(this);
        this.onChangeReleaseDate = this.onChangeReleaseDate.bind(this);
        this.getMovie = this.getMovie.bind(this);
        this.updateMovie = this.updateMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);

        this.state = {
            currentMovie: {
                id: null,
                title: "",
                plot: "",
                releaseDate: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getMovie(this.props.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function(prevState) {
            return {
                currentMovie: {
                    ...prevState.currentMovie,
                    title: title
                }
            };
        });
    }

    onChangeReleaseDate(e) {
        const releaseDate = e.target.value;

        this.setState(function(prevState) {
            return {
                currentMovie: {
                    ...prevState.currentMovie,
                    releaseDate: releaseDate
                }
            };
        });
    }

    onChangePlot(e) {
        const plot = e.target.value;

        this.setState(prevState => ({
            currentMovie: {
                ...prevState.currentMovie,
                plot: plot
            }
        }));
    }

    getMovie(id) {
        MovieDataService.get(id)
            .then(response => {
                this.setState({
                    currentMovie: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateMovie() {
        MovieDataService.update(
            this.state.currentMovie.id,
            this.state.currentMovie
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The movie was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteMovie() {
        MovieDataService.delete(this.state.currentMovie.id)
            .then(response => {
                console.log(response.data);
                this.props.navigate('/')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentMovie } = this.state;

        return (
            <div>
                {currentMovie ? (
                    <div>
                        <h4>Movie</h4>
                        <form>
                            <div>
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentMovie.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div>
                                <label htmlFor="plot">Plot</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="plot"
                                    value={currentMovie.plot}
                                    onChange={this.onChangePlot}
                                />
                            </div>
                            <div>
                                <label htmlFor="releaseDate">ReleaseDate</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="releaseDate"
                                    value={currentMovie.releaseDate}
                                    onChange={this.onChangeReleaseDate}
                                />
                            </div>

                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteMovie}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateMovie}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a movie...</p>
                    </div>
                )}
            </div>
        );
    }
}

function WithParams(props) {
    let params = useParams();
    let navigate = useNavigate();
    return <Movie {...props} navigate={navigate} params={params} />
}

export default WithParams