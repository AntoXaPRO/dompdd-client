import { TBaseDbEntity } from '../..'
import { TPerson } from './person'

/**
 * Документ.
 */
export type TDoc = TBaseDbEntity & {
  // Тип документа.
  // type: TDocType
  // Перс. данные.
  person: TPerson

  // Серия.
  series?: string
  // Номер.
  number?: string
  // Выдан.
  issued?: string
  // Дата выдачи.
  date?: Date

  // Название.
  name?: string
}

