import React from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { find } from 'lodash'
import { useSelector } from 'react-redux'
import { MEDIA_TYPES } from '../constants'
import { getMovies, getTVShows } from '../selectors/MediaSelector'
import IMedia from '../types/Media'

const MediaDetailsWrap = styled('div')({
  marginTop: 30,
  padding: 40,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  '> img': {
    alignSelf: 'center',
    borderRadius: '50%',
    width: 400,
    height: 400,
    objectFit: 'cover',
  },
})

const BackButton = styled('button')({
  padding: '10px 20px',
  cursor: 'pointer',
  width: '20%',
  alignSelf: 'center',
  backgroundColor: 'white',
  border: 'none',
  fontSize: '16px',
  textTransform: 'uppercase',
  '&:focus': {
    outline: 'none',
  },
  '&:hover': {
    backgroundColor: '#f3f3f3',
  },
})

const Title = styled('h2')({
  fontWeight: 300,
  letterSpacing: 1,
  textTransform: 'uppercase',
})

const DetailItem = styled('div')({
  width: '50%',
  margin: '0 auto',
  textAlign: 'left',
})

interface IMediaURLParams {
  id: string
  mediaType: string
}

const Panel = styled(motion.div)({})

const MediaDetails: React.FC = () => {
  const history = useHistory()

  const { id, mediaType } = useParams() as IMediaURLParams
  const mediaList = useSelector(
    mediaType === MEDIA_TYPES.MOVIE ? getMovies : getTVShows
  )
  const targetMedia = find(
    mediaList,
    // eslint-disable-next-line radix
    (media: IMedia) => media.id === parseInt(id)
  ) as IMedia

  return (
    <AnimatePresence>
      <MediaDetailsWrap>
        <Panel
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: {
              y: '100%',
            },
            visible: {
              y: 0,
            },
          }}
          transition={{
            ease: [0.23, 0.52, 0.51, 0.93],
          }}
        >
          <Title>{targetMedia.title}</Title>
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img src={targetMedia.imgUrl} alt="Media image" />
          <br />
          <DetailItem>
            <b>Overview: </b>
            <br />
            {targetMedia.overview}
          </DetailItem>
          <br />
          <DetailItem>
            <b>Average Vote: </b>
            <br />
            {targetMedia.averageVote}
          </DetailItem>
          <br />
          <br />
          <BackButton onClick={() => history.goBack()}>
            &#x2190; Back
          </BackButton>
        </Panel>
      </MediaDetailsWrap>
    </AnimatePresence>
  )
}

export { MediaDetails }
