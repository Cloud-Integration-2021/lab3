import React, {Component} from "react";
import MovieDataService from "../services/movie.service";
import { useNavigate } from "react-router-dom";

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
        this.props.navigate('/');
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
            <div>
                <div>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            name="title"
                        />
                    </div>

                    <div>
                        <label htmlFor="plot">Plot</label>
                        <input
                            type="text"
                            className="form-control"
                            id="plot"
                            required
                            value={this.state.plot}
                            onChange={this.onChangePlot}
                            name="plot"
                        />
                    </div>

                    <div>
                        <label htmlFor="releaseDate">ReleaseDate</label>
                        <input
                            type="text"
                            className="form-control"
                            id="releaseDate"
                            required
                            value={this.state.releaseDate}
                            onChange={this.onChangeReleaseDate}
                            name="releaseDate"
                        />
                    </div>

                    <button onClick={this.submitMovie} className="btn btn-success">
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <AddMovie {...props} navigate={navigate} />
}

export default WithNavigate