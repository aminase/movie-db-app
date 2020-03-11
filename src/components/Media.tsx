import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import IMedia from '../types/Media'

const MediaWrap = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 21%',
  textAlign: 'center',
  padding: 20,
  opacity: 0.9,
  '&:hover': {
    opacity: 1,
  },
  '> a': {
    textDecoration: 'none',
    color: '#333',
  },
  img: {
    borderRadius: '50%',
    alignSelf: 'center',
    cursor: 'pointer',
  },
})

const Title = styled('div')({
  fontSize: 16,
  padding: 20,
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: 1,
  '&:hover': {
    fontWeight: 'bold',
  },
})

const Panel = styled(motion.div)({})

interface ISingleMedia {
  media: IMedia
  mediaType: string
}

// eslint-disable-next-line react/prop-types
const Media: React.FC<ISingleMedia> = ({ media, mediaType }) => {
  // eslint-disable-next-line react/prop-types
  const mediaDetailsPageUrl = `${mediaType}/${media.id}`
  return (
    <AnimatePresence>
      <MediaWrap>
        <NavLink to={mediaDetailsPageUrl}>
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
            <img
              height="200"
              width="200"
              src={media.imgUrl}
              alt="Media Image"
            />
            <Title>{media.title}</Title>
          </Panel>
        </NavLink>
      </MediaWrap>
    </AnimatePresence>
  )
}

export { Media }
