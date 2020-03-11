import IMedia from '../types/Media'

enum MEDIA_ACTIONS {
  FETCH_MOVIES = 'MEDIA_ACTIONS::FETCH_MOVIES',
  SET_MOVIES = 'MEDIA_ACTIONS::SET_MOVIES',
  FETCH_TVSHOWS = 'MEDIA_ACTIONS::FETCH_TVSHOWS',
  SET_TVSHOWS = 'MEDIA_ACTIONS::SET_TVSHOWS',
  SEARCH_MEDIA = 'MEDIA_ACTIONS::SEARCH_MEDIA',
  TOGGLE_LOADER = 'MEDIA_ACTIONS::TOGGLE_LOADER',
}

// movies
interface IFetchMovies {
  type: typeof MEDIA_ACTIONS.FETCH_MOVIES
}

const fetchMovies = () => {
  return { type: MEDIA_ACTIONS.FETCH_MOVIES }
}

interface ISetMovies {
  type: typeof MEDIA_ACTIONS.SET_MOVIES
  payload: IMedia[]
}

const setMovies = (movies: IMedia[]) => {
  return { type: MEDIA_ACTIONS.SET_MOVIES, payload: movies }
}

// tv showes
interface IFetchTVShows {
  type: typeof MEDIA_ACTIONS.FETCH_MOVIES
}

const fetchTVShows = () => {
  return { type: MEDIA_ACTIONS.FETCH_TVSHOWS }
}

interface ISetTVShows {
  type: typeof MEDIA_ACTIONS.SET_TVSHOWS
  payload: IMedia[]
}

const setTVShows = (tvShowes: IMedia[]) => {
  return { type: MEDIA_ACTIONS.SET_TVSHOWS, payload: tvShowes }
}

interface ISearchMedia {
  type: typeof MEDIA_ACTIONS.SEARCH_MEDIA
  payload: any
}

const searchMedia = (keyword: string, mediaType: string) => {
  return { type: MEDIA_ACTIONS.SEARCH_MEDIA, payload: { keyword, mediaType } }
}

interface IToggleLoader {
  type: typeof MEDIA_ACTIONS.TOGGLE_LOADER
}

const toggleLoader = () => {
  return { type: MEDIA_ACTIONS.TOGGLE_LOADER }
}

export type IAllActions =
  | IFetchMovies
  | ISetMovies
  | IFetchTVShows
  | ISetTVShows
  | ISearchMedia
  | IToggleLoader

export {
  fetchMovies,
  setMovies,
  fetchTVShows,
  setTVShows,
  searchMedia,
  toggleLoader,
  MEDIA_ACTIONS,
}
