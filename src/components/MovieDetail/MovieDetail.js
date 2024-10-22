import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedMovieOrShow, fetchAsyncMovieOrShowDetail, removeSelectedMovieOrShow } from '../../features/movies/movieSlice';
import { useParams } from 'react-router-dom';
import "./MovieDetail.scss"

const MovieDetail = () => {
    const dispatch = useDispatch();
    const { imdbID } = useParams();
    const selectedMovieOrShow = useSelector(getSelectedMovieOrShow);

    console.log("selectedMovieOrShow", selectedMovieOrShow)

    useEffect(() => {
        dispatch(fetchAsyncMovieOrShowDetail(imdbID))

        return () =>
        {
            dispatch(removeSelectedMovieOrShow());
        }

    }, [dispatch, imdbID])
    return (
        <div className='movie-section'>
            {Object.keys(selectedMovieOrShow).length === 0 ? 
                (<div>...Loading</div>)
                :
                (
                    <>
                        <div className='section-left'>
                            <div className='movie-title'>{selectedMovieOrShow.Title}</div>
                            <div className='movie-rating'>
                                <span>
                                    IMDB Rating <i className='fa fa-star'></i> : {selectedMovieOrShow.imdbRating} 
                                </span>
                                <span>
                                    IMDB Votes <i className='fa fa-thumbs-up'></i> : {selectedMovieOrShow.imdbVotes} 
                                </span>
                                <span>
                                    Runtime <i className='fa fa-film'></i> : {selectedMovieOrShow.Runtime} 
                                </span>
                                <span>
                                    Year <i className='fa fa-calendar'></i> : {selectedMovieOrShow.Year} 
                                </span>
                            </div>
                            <div className='movie-plot'>
                                {selectedMovieOrShow.Plot}
                            </div>
                            <div className='movie-info'>
                                <div>
                                    <span>Director</span>
                                    <span>{selectedMovieOrShow.Director}</span>
                                </div>
                                <div>
                                    <span>Stars</span>
                                    <span>{selectedMovieOrShow.Actors}</span>
                                </div>
                                <div>
                                    <span>Genres</span>
                                    <span>{selectedMovieOrShow.Genre}</span>
                                </div>
                                <div>
                                    <span>Languages</span>
                                    <span>{selectedMovieOrShow.Language}</span>
                                </div>
                                <div>
                                    <span>Awards</span>
                                    <span>{selectedMovieOrShow.Awards}</span>
                                </div>
                            </div>
                        </div>
                        <div className='section-right'>
                            <img src={selectedMovieOrShow.Poster} alt={selectedMovieOrShow.Title} />
                        </div>
                    </>
                )
            }
            
        </div>
    );
};

export default MovieDetail;