import { TBaseDbEntity } from '../..'
import { TUnit } from './unit'

/**
 * Интерфейс офиса обучения.
 */
export type TOffice = TBaseDbEntity & {
  unit: TUnit

  name: string
  location: string
  operatingTime: string

  prefix: string
  places: number
  space: number
  number: number

  sale?: {
    price: number
    description: string
  }

  // Виртуальные поля.
  fullOffice: string
}

/**
 * фильтр.
 */
export type TOfficeFilter = {
  unit?: boolean | string
}
