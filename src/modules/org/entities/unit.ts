import { TBaseDbEntity } from '../..'
import { TCity } from './city'
import { TOrganization } from './organization'
import { TOffice } from './office'

/**
 * Интерфейс подразделения организации.
 */
export type TUnit = TBaseDbEntity & {
  city: TCity

  organization: TOrganization
  offices: TOffice[]

  name: string
  slogan: string
  phone: object
  email: string

  number: number

  parent?: string

  site?: {
    vk: {
      group: number
    },
    yandex: {
      rating: number
    },
    slider: [
      {
        name: string
        image: string
        number: number
      }
    ]
    map: string
  }
}
