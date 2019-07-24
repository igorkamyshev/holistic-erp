import { Injectable } from '@nestjs/common'

import { TelegramInformator } from '&back/telegram/infrastructure/TelegramInformator'
import { IdGenerator } from '&back/utils/infrastructure/IdGenerator/IdGenerator'
import { Agency } from '&back/agency/domain/Agency.entity'
import { EntitySaver } from '&back/db/EntitySaver'

import { TelegramChannel } from '../domain/TelegramChannel.entity'
import { cleanTelegramLink } from './helpers/cleanTelegramLink'

@Injectable()
export class ChannelCreator {
  constructor(
    private readonly telegramInformator: TelegramInformator,
    private readonly idGenerator: IdGenerator,
    private readonly saver: EntitySaver,
  ) {}

  async createTelegramChannel(owner: Agency, link: string) {
    // for "t.me/code_for" or "https://t.me/@code_for" we must use just "code_for"
    const realLink = cleanTelegramLink(link)

    const [id, channelName] = await Promise.all([
      this.idGenerator.getId(),
      this.telegramInformator.getChannelName(realLink).catch(() => null),
    ])

    const telegramChannel = new TelegramChannel(id, realLink)
    telegramChannel.name = channelName

    owner.attachTelegramChannel(telegramChannel)

    await this.saver.save(...[owner, telegramChannel])
  }
}
