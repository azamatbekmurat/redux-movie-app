import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MovieListing from "../MovieListing/MovieListing";
import { fetchAsyncMovies, fetchAsyncShows} from "../../features/movies/movieSlice"

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const movieText = "Harry";
        const showText = "Harry";
        dispatch(fetchAsyncMovies(movieText));
        dispatch(fetchAsyncShows(showText))

    }, [dispatch]);

    return (
        <div>
            <div className='banner-img'></div>
            <MovieListing />            
        </div>
    );
};

export default Home;