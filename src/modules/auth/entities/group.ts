import { TBaseDbEntity } from '../..'

/**
 * Интерфейс группы аккаунтов.
 */
export type TGroup = TBaseDbEntity & {
  name: string
  description?: string
}
