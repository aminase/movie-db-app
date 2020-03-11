import { StoreState } from '../store'

const getMovies = (state: StoreState) => state.media.moviesList
const getTVShows = (state: StoreState) => state.media.tvShowsList
const getLoadingStatus = (state: StoreState) => state.media.loading

export { getMovies, getTVShows, getLoadingStatus }
