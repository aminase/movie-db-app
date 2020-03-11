import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { getMovies } from '../selectors/MediaSelector'
import IMedia from '../types/Media'
import { Media } from '../components/Media'
import { MEDIA_TYPES } from '../constants'

const MoviesWrap = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  padding: 100,
  flexWrap: 'wrap',
})

const Movies: React.FC = () => {
  const moviesList = useSelector(getMovies)

  return (
    <MoviesWrap>
      {moviesList.map((movie: IMedia) => (
        <Media mediaType={MEDIA_TYPES.MOVIE} media={movie} />
      ))}
    </MoviesWrap>
  )
}

export { Movies }
