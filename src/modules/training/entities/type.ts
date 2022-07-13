import { TBaseDbEntity } from '../..'
import { TTrainingGroup } from './group'

export type TTrainingGroupType = TBaseDbEntity & {
  // Название.
  name: string
  // Порядковый номер.
  number: number
  // Иконка.
  icon: string

  // Виртуальные поля.
  items: TTrainingGroup[]
}
