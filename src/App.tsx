import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Movies } from './pages/Movies'
import { TVShows } from './pages/TVShows'
import { fetchMovies, fetchTVShows, searchMedia } from './actions/MediaActions'
import { SearchBar } from './components/SearchBar'
import { MediaDetails } from './components/MediaDetails'
import { useDebounce } from './hooks'
import { MEDIA_TYPES } from './constants'
import { Spinner } from './assets/Spinner'
import { getLoadingStatus } from './selectors/MediaSelector'

const AppWrapper = styled('div')({
  margin: '50px 80px 10px 80px',
  display: 'flex',
  flexDirection: 'column',
})

const SpinnerWrap = styled('div')({
  position: 'fixed',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#fff',
  opacity: 0.7,
  zIndex: 1000,
  top: 80,
  left: 0,
  right: 0,
  bottom: 0,
})

const NavWrap = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  '> a': {
    flex: 1,
    padding: '9px 16px',
    color: '#55717d',
    letterSpacing: 1,
    textDecoration: 'none',
    borderBottom: '2px solid #aeaeaf',
    '&:hover': {
      background: '#f3f3f3',
    },
    '&.active': {
      borderColor: '#00D276',
      color: '#00D276',
    },
  },
})

const getMediaTypeFromLocationPath = (path: string) =>
  path === '/' ? MEDIA_TYPES.TV_SHOW : MEDIA_TYPES.MOVIE

const App: React.FC = () => {
  const dispatch = useDispatch()
  const [searchKeyword, setSearchKeyword] = useState('')
  const debouncedSearchKeyword = useDebounce(searchKeyword, 1000)
  const loading = useSelector(getLoadingStatus)

  useEffect(() => {
    dispatch(fetchMovies())
    dispatch(fetchTVShows())
  }, [])

  useEffect(() => {
    const targetMedia = getMediaTypeFromLocationPath(window.location.pathname)
    if (debouncedSearchKeyword.length > 2) {
      dispatch(searchMedia(debouncedSearchKeyword, targetMedia))
    } else {
      dispatch(
        targetMedia === MEDIA_TYPES.MOVIE ? fetchMovies() : fetchTVShows()
      )
    }
  }, [debouncedSearchKeyword])

  return (
    <AppWrapper>
      <BrowserRouter>
        <NavWrap>
          <NavLink to="/" exact>
            TV SHOWS
          </NavLink>
          <NavLink to="/movies">MOVIES</NavLink>
        </NavWrap>
        <SearchBar onChangeSearchInput={setSearchKeyword} />
        {loading && (
          <SpinnerWrap>
            <Spinner color="#00D276" width="100" />
          </SpinnerWrap>
        )}
        <Switch>
          {/* eslint-disable-next-line react/no-children-prop */}
          <Route path="/:mediaType/:id" children={<MediaDetails />} />
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/">
            <TVShows />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppWrapper>
  )
}

export default App
