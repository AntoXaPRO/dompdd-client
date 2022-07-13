import { TBaseDbEntity } from '../..'

/**
 * Тип данных - город.
 */
export type TCity = TBaseDbEntity & {
  name: string
  alias: string
}
