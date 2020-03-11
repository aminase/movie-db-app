import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { getTVShows } from '../selectors/MediaSelector'
import IMedia from '../types/Media'
import { Media } from '../components/Media'
import { MEDIA_TYPES } from '../constants'

const MoviesWrap = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  padding: 100,
  flexWrap: 'wrap',
})

const TVShows: React.FC = () => {
  const showsList = useSelector(getTVShows)

  return (
    <MoviesWrap>
      {showsList.map((tvShow: IMedia) => (
        <Media mediaType={MEDIA_TYPES.TV_SHOW} media={tvShow} />
      ))}
    </MoviesWrap>
  )
}

export { TVShows }
