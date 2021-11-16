import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import MoviesList from "./components/movies-list.component";
import AddMovie from "./components/add-movie.component";
import Movie from "./components/movie.component";

export default function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/add">Launch</Link>
            </nav>

            <Routes>
                <Route path="/" element={<MoviesList />} />
                <Route path="add" element={<AddMovie />}/>
                <Route path="movies/:id" element={<Movie/>}/>
            </Routes>
        </Router>
    );
}