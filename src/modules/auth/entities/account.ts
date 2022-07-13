import { TBaseDbEntity } from '../..'
import { TGroup } from './group'
import { TPerson } from './person'

// Типы данных (аккаунт).
export type TAccount = TBaseDbEntity & {
  email: string

  person: TPerson
  groups?: TGroup[]

  passwordHash?: string
  disabled?: boolean
}
