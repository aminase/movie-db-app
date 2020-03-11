import { takeEvery, put, call, all } from 'redux-saga/effects'
import axios from 'axios'
import { MEDIA_ACTIONS, setMovies, setTVShows } from '../actions/MediaActions'
import { API_KEY, API_ROOT, MEDIA_TYPES } from '../constants'
import { getMediaListFromResponse } from '../helpers'
import IAxiosResponse from '../styles/AxiosResponse'

const MediaSaga = function*() {
  yield all([
    takeEvery(MEDIA_ACTIONS.FETCH_MOVIES, fetchMovies),
    takeEvery(MEDIA_ACTIONS.FETCH_TVSHOWS, fetchTVShows),
    takeEvery(MEDIA_ACTIONS.SEARCH_MEDIA, searchMedia),
  ])
}

const searchMedia = function*(action: any) {
  const { keyword, mediaType } = action.payload

  const searchResponse: IAxiosResponse = yield call(() =>
    axios.get(
      `${API_ROOT}search/${mediaType}?api_key=${API_KEY}&language=en-US&query=${keyword}`
    )
  )

  const searchResults = getMediaListFromResponse(searchResponse)

  // setting store
  yield put(
    mediaType === MEDIA_TYPES.MOVIE
      ? setMovies(searchResults)
      : setTVShows(searchResults)
  )
}

const fetchMovies = function*() {
  const moviesResponse: IAxiosResponse = yield call(() =>
    axios.get(
      `${API_ROOT}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    )
  )
  const moviesList = getMediaListFromResponse(moviesResponse)

  // setting store variable moviesList
  yield put(setMovies(moviesList))
}

const fetchTVShows = function*() {
  const tvShowsResponse: IAxiosResponse = yield call(() =>
    axios.get(
      `${API_ROOT}tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    )
  )
  const tvShowsList = getMediaListFromResponse(tvShowsResponse)

  // setting store variable tvShowsList
  yield put(setTVShows(tvShowsList))
}

export { MediaSaga }
