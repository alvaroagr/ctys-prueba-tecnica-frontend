import { Movie } from './Movie'
import { Room } from './Room'
import { Schedule } from './Schedule'

export const MOVIES: Movie[] = [
  {
    id: 101,
    name: "48 Shades",
    description: "Comedy|Drama",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/48shadesposter.jpg/220px-48shadesposter.jpg",
  },
  {
    id: 202,
    name: "Kotch",
    description: "Comedy|Drama",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Kotchposter.jpg/220px-Kotchposter.jpg",
  },
]

export const ROOMS: Room[] = [
  {
    id: 1,
    capacity: 30
  },
  {
    id: 2,
    capacity: 20
  },
  {
    id: 3,
    capacity: 50
  },
]

export const SCHEDULES: Schedule[] = []
