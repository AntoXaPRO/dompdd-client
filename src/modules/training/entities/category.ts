import { TBaseDbEntity } from '../..'

export type TTrainingGroupCategory = TBaseDbEntity & {
  // Название.
  name: string
  // Порядковый номер.
  number: number
  // Цвет.
  color?: string
}
