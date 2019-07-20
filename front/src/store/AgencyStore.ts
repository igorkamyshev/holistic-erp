import { action } from 'mobx'

import { CreateAgency } from '&shared/model/CreateAgency'
import { JoinAgency } from '&shared/model/JoinAgency'
import { Token } from '&shared/model/Token'

import { ApplicationStore } from './ApplicationStore'

export class AgecnyStore {
  constructor(private readonly store: ApplicationStore) {}

  @action
  async createAgency(data: CreateAgency) {
    const { token } = await this.store.api.post<Token>('agency/start/create')(
      data,
    )

    this.store.userStore.resetUserInfo()

    return token
  }

  @action
  async joinAgency(data: JoinAgency) {
    await this.store.api.post<void>('/agency/start/join')(data)

    this.store.userStore.resetUserInfo()
  }
}
