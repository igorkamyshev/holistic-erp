import { Injectable } from '@nestjs/common'
import axios from 'axios'
import * as cheerio from 'cheerio'

const MAIN_HOST = 't.me'
const BACKUP_HOST = 'tlinks.run'

@Injectable()
export class TelegramInformator {
  async getChannelName(link: string): Promise<string> {
    const fetchHtml = (url: string): Promise<string> =>
      axios.get(`https://${url}`).then(response => response.data)

    const html = await fetchHtml(`${MAIN_HOST}/${link}`).catch(() =>
      fetchHtml(`${BACKUP_HOST}/${link}`),
    )

    return cheerio
      .load(html)('.tgme_page_title')
      .text()
      .trim()
  }
}
