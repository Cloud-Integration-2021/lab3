import React, {Component} from "react";
import MovieDataService from "../services/movie.service";
import {useNavigate} from "react-router-dom";

class AddMovie extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePlot = this.onChangePlot.bind(this);
        this.onChangeReleaseDate = this.onChangeReleaseDate.bind(this);
        this.submitMovie = this.submitMovie.bind(this);
        this.newMovie = this.newMovie.bind(this);

        this.state = {
            id: null,
            title: "",
            plot: "",
            releaseDate: "",
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangePlot(e) {
        this.setState({
            plot: e.target.value
        });
    }

    onChangeReleaseDate(e) {
        this.setState({
            releaseDate: e.target.value
        });
    }

    submitMovie() {
        let data = {
            title: this.state.title,
            plot: this.state.description,
            releaseDate: this.state.releaseDate,
        };

        MovieDataService.create(data)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    plot: response.data.plot,
                    releaseDate: response.data.releaseDate,
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        this.props.navigate("/");
    }

    newMovie() {
        this.setState({
            id: null,
            title: "",
            plot: "",
            releaseDate: "",
        });
    }

    render() {
        return (
            <div className="p-4 rounded-md text-left">
                <h2 className="text-center text-lg leading-6 font-medium text-black">Add movies</h2>
                <form>
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="plot" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    id="title"
                                    required
                                    value={this.state.title}
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
                                    required
                                    value={this.state.plot}
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
                                    required
                                    value={this.state.releaseDate}
                                    onChange={this.onChangeReleaseDate}
                                    name="releaseDate"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-3 bg-white-50 sm:px-6">
                        <button
                            onClick={this.submitMovie}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Save
                        </button>
                    </div>

                </form>
            </div>
        )
            ;
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <AddMovie {...props} navigate={navigate}/>
}

export default WithNavigate