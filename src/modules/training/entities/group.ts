import { SchemaOf, object, string, number, date, boolean, array } from 'yup'
import { TBaseDbEntity, BaseDbValidEntity } from '../..'
import type { TOffice, TUnit } from '../../org'

import type { TTrainingGroupType } from './type'
import type { TTrainingGroupCategory } from './category'

/**
 * Группы обучения.
 */
export type TTrainingGroup = TBaseDbEntity & {
  // Тип.
  type: TTrainingGroupType
  // Категория группы.
  category: TTrainingGroupCategory

  // Подразделение.
  unit: TUnit
  // Офис.
  office: TOffice

  // Порядковый номер.
  number: number
  // Дата/Время старта.
  dateTimeStart: Date
  // Расписание.
  days: string[]

  // Видимость на сайте.
  published?: boolean
  // Закрыта.
  closed?: boolean

  // Описание.
  description?: string

  // Виртуальные свойства.
  alias: string
  status: {
    name: string
    alias: string
    color: string
  }
}

/**
 * Тип данных (группа обучения).
 */
export type TTrainingGroupForm = {
  _id?: string

  type: string
  category: string

  unit: string
  office: string

  dateTimeStart: Date
  days: string[]

  number?: number
  published?: boolean
  closed?: boolean
  description?: string
}


/**
 * Схема валидации формы.
 */
const groupFromValidSchema: SchemaOf<TTrainingGroupForm> = object({
  _id: string()
    .meta({ label: 'ID' })
    .trim()
    .lowercase(),
  type: string()
    .meta({ label: 'Тип группы' })
    .trim()
    .lowercase()
    .required('Укажите тип группы'),
  category: string()
    .meta({ label: 'Категория' })
    .trim()
    .lowercase()
    .required('Укажите категорию'),
  unit: string()
    .meta({ label: 'Подразделение' })
    .trim()
    .lowercase()
    .required('Укажите подразделение'),
  office: string()
    .meta({ label: 'Офис' })
    .trim()
    .lowercase()
    .required('Укажите офис'),
  number: number()
    .meta({ label: 'Номер' }),
  dateTimeStart: date()
    .meta({ label: 'Дата/Время старта' })
    .default(new Date())
    .required('Укажите дату/время старта'),
  days: array()
    .meta({ label: 'График' })
    .required('Укажите график обучения'),
  published: boolean()
    .meta({ label: 'Опубликована' })
    .default(true),
  closed: boolean()
    .meta({ label: 'Закрыта' })
    .default(false),
  description: string()
    .meta({ label: 'Описание' })
})

/**
 * Фильтр групп.
 */
export type TTrainingGroupFilter = {
  unit?: boolean
  active?: boolean
  year?: number | null
  type?: string | null
  category?: string | null
}

/**
 * Форма перс. данных.
 */
export class TrainingGroupFormModel extends BaseDbValidEntity<TTrainingGroupForm> {
  constructor(obj: any = {}) {
    if(!obj._id) obj._id = 'create'

    if(obj.published !== true) obj.published = false
    if(obj.closed !== true) obj.closed = false

    obj.type = obj.type?._id || obj.type
    obj.category = obj.category?._id || obj.category

    obj.unit = obj.unit?._id || obj.unit
    obj.office = obj.office?._id || obj.office

    super(obj, groupFromValidSchema)
  }

  convertPreSave() {
    let obj = super.convertPreSave()
    obj._id = this._id
    obj.published = obj.published ? true : false
    obj.closed = obj.closed ? true : false
    return obj
  }
}
