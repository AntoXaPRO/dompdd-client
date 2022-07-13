// Проверка ФИО.
export const reqexpFIO = /^[А-яЁё]+$/
// Значения номера.
export const reqexpPhone = /^[9]\d{9}$/

/**
 * Возвращает значение номера телефона.
 */
export const getPhoneNumberValue = (phone?: any): number | undefined => {
  if (phone) {
    if (typeof phone === 'number') {
      phone = phone.toString()
    }

    if (typeof phone === 'string') {
      phone = phone.replace(/\D/g, '').replace(/^[78]/, '')
      return Number.parseInt(phone) || undefined
    }
  }

  return undefined
}

/**
 * Валидация мобильного номера телефона.
 */
export const validPhoneNumber = (value?: number | string) => {
  if (!value) return false
  const str: string = value.toString()
  if (str.length !== 10) return false
  if (str.match(reqexpPhone) === null) return false
  return true
}

/**
 * Формат номера телефона.
 */
export const getPhoneNumberFormat = (
  phone: number | string,
  prefix: string = '+7 '
): string => {
  let result = prefix

  const strValue = getPhoneNumberValue(phone)?.toString().substring(0, 10)
  if (strValue) {
    for (let i = 0; i < strValue.length; i++) {
      // if (i === 3 || i === 6 || i === 8) result += ' '

      switch(i) {
        case 0:
          result += '('
          break
        case 3:
          result += ') '
          break
        case 6:
          result += '-'
          break
        case 8:
          result += '-'
          break
      }

      result += strValue[i]
    }
  }

  return result
}

/**
 * Функция для проеобрадования ФИО.
 */
export const capitalize = (str: string = '') => {
  return str[0] ? str[0].toUpperCase() + str.substring(1) : ''
}
