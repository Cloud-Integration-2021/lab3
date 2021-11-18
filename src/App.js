import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";
import MoviesList from "./components/movies-list.component";
import AddMovie from "./components/add-movie.component";
import Movie from "./components/movie.component";
import {Disclosure} from "@headlessui/react";
import FooterComponent from "./components/footer.component";

export default function App() {
    return (
        <Router>
            <div className="flex flex-col h-screen">
                <Disclosure as="nav" className="bg-gray-800">
                    {({open}) => (
                        <>
                            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                                <div className="relative flex items-center justify-between h-16">
                                    <div
                                        className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                        <div className="flex-shrink-0 flex items-center text-white">
                                            Movie UI
                                        </div>
                                        <div className="hidden sm:block sm:ml-6">
                                            <div className="flex space-x-4">
                                                <NavLink
                                                    exact={true}
                                                    to="/"
                                                    className="navbar text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                                    Movies list
                                                    {/*text-gray-300 hover:bg-gray-700 hover:text-white*/}
                                                </NavLink>
                                                <NavLink
                                                    to="/add"
                                                    className="navbar text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                                    Add
                                                    {/*text-gray-300 hover:bg-gray-700 hover:text-white*/}
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Disclosure>

                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<MoviesList/>}/>
                        <Route path="/add" element={<AddMovie/>}/>
                        <Route path="/movies/:id" element={<Movie/>}/>
                    </Routes>
                </div>

                <FooterComponent/>
            </div>
        </Router>
    );
}
