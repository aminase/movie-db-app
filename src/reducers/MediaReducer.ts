import { MEDIA_ACTIONS, IAllActions } from '../actions/MediaActions'
import IMedia from '../types/Media'

interface IMediaReducer {
  moviesList: IMedia[]
  tvShowsList: IMedia[]
  loading: boolean
}

const defaultState = {
  moviesList: [],
  tvShowsList: [],
  loading: false,
}

export default (state: IMediaReducer = defaultState, action: IAllActions) => {
  switch (action.type) {
    case MEDIA_ACTIONS.SET_MOVIES:
      return { ...state, moviesList: action.payload }
    case MEDIA_ACTIONS.SET_TVSHOWS:
      return { ...state, tvShowsList: action.payload }
    case MEDIA_ACTIONS.TOGGLE_LOADER:
      return { ...state, loading: !state.loading }
    default:
      return state
  }
}
