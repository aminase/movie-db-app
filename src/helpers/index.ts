import { slice } from 'lodash'
import IMedia from '../types/Media'
import IAxiosResponse from '../types/AxiosResponse'
import logo from '../assets/movieDBLogo.png'

const getMediaListFromResponse = (response: IAxiosResponse): IMedia[] => {
  const responseChunked = slice(response.data.results, 0, 10)

  // looping through movies/tvShows and building movie object
  return responseChunked.map((item: any) => {
    return {
      id: item.id,
      title: item.name || item.title,
      imgUrl: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : logo,
      averageVote: item.vote_average,
      overview: item.overview,
    }
  })
}

export { getMediaListFromResponse }
