import { SchemaOf, object, string, number, date } from 'yup'
import { TBaseDbEntity, BaseDbValidEntity } from '../..'

import { TAccount } from './account'
import { TGender, GenderEnum, genders } from './gender'
import { TAvatar } from './avatar'

import * as personHelpers from '../helpers'

/**
 * Тип данных перс. данных.
 */
export type TPerson = TBaseDbEntity & {
  gender: TGender
  avatar: TAvatar

  firstName: string

  lastName?: string
  middleName?: string

  birthday?: Date
  phone?: number
  account?: TAccount

  comment?: string

  // Виртуальные поля.
  fullName: string
}

/**
 * Тип данных (форма перс. данных).
 */
export type TPersonForm = {
  _id?: string
  gender: string
  firstName: string

  middleName?: string
  lastName?: string

  birthday?: Date
  phone?: number
  comment?: string
}

/**
 * Базовая схема валидации данных.
 */
export const personFormSchemaValid = {
  _id: string()
    .meta({ label: 'ID' })
    .trim()
    .lowercase(),
  gender: string()
    .meta({ label: 'Гендер' })
    .oneOf(genders)
    .required('Укажите гендер'),
  firstName: string()
    .meta({ label: 'Имя' })
    .trim()
    .matches(personHelpers.reqexpFIO, 'Имя должно содержать только буквы кириллицы')
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(30, 'Фамилия должна содержать не более 30 символов')
    .required('Укажите имя'),
  middleName: string()
    .meta({ label: 'Отчество' })
    .trim()
    .matches(personHelpers.reqexpFIO, 'Отчество должно содержать только буквы кириллицы')
    .min(2, 'Отчество должно содержать минимум 2 символа')
    .max(30, 'Отчество должно содержать не более 30 символов'),
  lastName: string()
    .meta({ label: 'Фамилия' })
    .trim()
    .matches(personHelpers.reqexpFIO, 'Фамилия должна содержать только буквы кириллицы')
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(30, 'Фамилия должна содержать не более 30 символов'),
  birthday: date()
    .meta({ label: 'Дата рождения' }),
  phone: number()
    .meta({ label: 'Телефон' })
    .transform(({}, original) => {
      return personHelpers.getPhoneNumberValue(original)
    })
    .test(
      'phoneNumber',
      'Укажите корректный номер телефона',
      (value?: number) => {
        return value ? personHelpers.validPhoneNumber(value) : true
      }
    ),
  comment: string()
    .meta({ label: 'Комментарий' })
    .max(300, 'Комментарий должен содержать не более 300 символов')
}

/**
 * Схема валидации формы.
 */
const personFromValidSchema: SchemaOf<TPersonForm> = object(personFormSchemaValid)

/**
 * Форма перс. данных.
 */
export class PersonFormModel extends BaseDbValidEntity<TPersonForm> {
  constructor(obj: any = {}) {

    if(!obj._id) obj._id = 'create'

    // Если пол не указан (по умолчанию).
    if (!obj.gender) {
      obj.gender = GenderEnum.man
    }

    // Дата Д.Р.
    if (obj.birthday) {
      try {
        obj.birthday = new Date(obj.birthday)
      } catch (ex) {
        obj.birthday = undefined
      }
    }

    if(obj.firstName) {
      obj.firstName = personHelpers.capitalize(obj.firstName)
    }

    if(obj.middleName) {
      obj.middleName = personHelpers.capitalize(obj.middleName)
    }
    
    if(obj.lastName) {
      obj.lastName = personHelpers.capitalize(obj.lastName)
    }

    if(obj.phone) {
      obj.phone = personHelpers.getPhoneNumberValue(obj.phone)
    }

    super(obj, personFromValidSchema)
  }

  static getPhoneNumberFormat = personHelpers.getPhoneNumberFormat
  static getPhoneNumberValue = personHelpers.getPhoneNumberValue
  static validPhoneNumber = personHelpers.validPhoneNumber
  static capitalize = personHelpers.capitalize
}

/**
 * Фильтр для выборки персональных данных.
 */
export type TFilterPerson = { group?: string, q?: string }
