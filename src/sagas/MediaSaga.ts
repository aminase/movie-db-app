import { takeEvery, put, call, all, delay } from 'redux-saga/effects'
import axios from "axios"
import {
  MEDIA_ACTIONS,
  setMovies,
  setTVShows,
  toggleLoader,
} from '../actions/MediaActions'
import { API_KEY, API_ROOT, MEDIA_TYPES } from '../constants'
import { getMediaListFromResponse } from '../helpers'
import IAxiosResponse from '../types/AxiosResponse'

const MediaSaga = function* () {
  yield all([
    takeEvery(MEDIA_ACTIONS.FETCH_MOVIES, fetchMovies),
    takeEvery(MEDIA_ACTIONS.FETCH_TVSHOWS, fetchTVShows),
    takeEvery(MEDIA_ACTIONS.SEARCH_MEDIA, searchMedia),
  ])
}

const searchMedia = function* (action: any) {
  yield put(toggleLoader())

  // added here because API is too fast
  // in order to see loader,
  // please delete in production
  yield delay(1000)

  const { keyword, mediaType } = action.payload
  const searchResponse: IAxiosResponse = yield call(
    () => axios.get(`${API_ROOT}search/${mediaType}?api_key=${API_KEY}&language=en-US&query=${keyword}`),
  )

  const searchResults = getMediaListFromResponse(searchResponse)

  // setting store
  yield put(mediaType === MEDIA_TYPES.MOVIE ? setMovies(searchResults) : setTVShows(searchResults));

  // toggle loader
  yield put(toggleLoader())
}

const fetchMovies = function* () {
  yield put(toggleLoader())

  // added here because API is too fast
  // in order to see loader,
  // please delete in production
  yield delay(1000)

  const moviesResponse: IAxiosResponse = yield call(() =>
    axios.get(
      `${API_ROOT}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    )
  )

  const moviesList = getMediaListFromResponse(moviesResponse);

  // setting store variable moviesList
  yield put(setMovies(moviesList))

  // toggle loader
  yield put(toggleLoader())
}

const fetchTVShows = function* () {
  yield put(toggleLoader())

  // added here because API is too fast
  // in order to see loader,
  // please delete in production
  yield delay(1000)

  const tvShowsResponse: IAxiosResponse = yield call(() =>
    axios.get(
      `${API_ROOT}tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    )
  )

  const tvShowsList = getMediaListFromResponse(tvShowsResponse)

  // setting store variable tvShowsList
  yield put(setTVShows(tvShowsList))

  // toggle loader
  yield put(toggleLoader())
}

export { MediaSaga }