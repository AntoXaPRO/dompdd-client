import { TBaseDbEntity } from '../..'

/**
 * Тип данных организации.
 */
export type TOrganization = TBaseDbEntity & {
  name: string
  alias: string
  slogan?: string
}
