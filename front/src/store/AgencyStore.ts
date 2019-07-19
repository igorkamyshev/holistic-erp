import { CreateAgency } from '&shared/model/CreateAgency'
import { Token } from '&shared/model/Token'

import { ApplicationStore } from './ApplicationStore'

export class AgecnyStore {
  constructor(private readonly store: ApplicationStore) {}

  async createAgency(data: CreateAgency) {
    const { token } = await this.store.api.post<Token>('agency/start/create')(
      data,
    )

    return token
  }
}
