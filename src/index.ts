export * from './api'
export * from './notification'
export * from './modules'

import Api, { TApiServer } from './api'
import Notification from './notification'
import { Auth, Org, Training } from './modules'

// Экспорт по умолчанию.
export default class Client {
  name: string

  api: Api
  notification: Notification

  auth: Auth
  org: Org
  training: Training

  constructor(name: string, servers: TApiServer[]) {
    this.name = name

    this.api = new Api(servers)
    this.notification = new Notification()

    this.auth = new Auth(this.api, this.notification, this.name)
    this.org = new Org(this.api, this.notification)
    this.training = new Training(this.api, this.notification)
  }
}
