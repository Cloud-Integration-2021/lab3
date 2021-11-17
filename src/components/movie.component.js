import React, {Component} from "react";
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

        this.setState(function (prevState) {
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

        this.setState(function (prevState) {
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
                this.props.navigate("/");
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentMovie} = this.state;

        return (
            <div>
                {currentMovie &&
                <div className="p-4 rounded-md text-left sm:p-6">


                    {this.state.message &&
                    <div className="border-t-4 border-teal-500 rounded-b text-teal-200 px-4 py-3 shadow-md"
                         role="alert">
                        <div className="flex">
                            <div className="py-1">
                                <svg className="fill-current h-6 w-6 text-teal-500 mr-4"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold">{this.state.message}</p>
                            </div>
                        </div>
                    </div>
                    }

                    <h2 className="text-center text-lg leading-6 font-medium text-black">Editor movie</h2>
                    <div className="px-4 py-5 bg-white space-y-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="plot" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    id="title"
                                    value={currentMovie.title}
                                    onChange={this.onChangeTitle}
                                    name="name"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                />
                            </div>
                        </div>

                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="plot" className="block text-sm font-medium text-gray-700">
                                Plot
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    id="plot"
                                    value={currentMovie.plot}
                                    onChange={this.onChangePlot}
                                    name="plot"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                />
                            </div>
                        </div>

                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">
                                Release Date
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                    type="date"
                                    id="releaseDate"
                                    value={currentMovie.releaseDate}
                                    onChange={this.onChangeReleaseDate}
                                    name="releaseDate"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center ">

                        <button
                            className="inline-flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={this.deleteMovie}
                            type="submit"
                        >
                            Delete
                        </button>

                        <button
                            className="inline-flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            onClick={this.updateMovie}
                            type="submit"
                        >
                            Update
                        </button>
                    </div>
                </div>

                }
            </div>
        );
    }
}

function WithParams(props) {
    let params = useParams();
    let navigate = useNavigate();
    return <Movie {...props} navigate={navigate} params={params}/>
}

export default WithParams