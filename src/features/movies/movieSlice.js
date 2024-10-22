import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi"
import {APIKey} from "../../common/apis/movieApiKey"

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`)

    return response.data;
})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`)

    return response.data;
})


export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`)

    return response.data;
})

const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {},
    isLoading: false
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {         
         removeSelectedMovieOrShow: (state) => {
            state.selectedMovieOrShow = {}
         }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAsyncMovies.pending, (state) => {
                console.log("pending");
                return {...state, isLoading: true}
            })
            .addCase(fetchAsyncMovies.fulfilled, (state, {payload}) => {
                console.log("fetched successfully");

                return {...state, movies: payload, isLoading: false}
            })
            .addCase(fetchAsyncMovies.rejected, () => {
                console.log("rejected");
            })
            .addCase(fetchAsyncShows.fulfilled, (state, {payload}) => {
                console.log("fetched shows successfully");

                return {...state, shows: payload, isLoading: false}
            })
            .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, {payload}) => {
                console.log("fetched movie or show detail successfully");

                return {...state, selectedMovieOrShow: payload}
            })
            
    }
})

export const {  removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getLoadingStatus = (state) => state.movies.isLoading;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;