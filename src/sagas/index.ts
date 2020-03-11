import { all } from 'redux-saga/effects'
import { MediaSaga } from './MediaSaga'

export default function* rootSaga() {
  yield all([MediaSaga()])
}
