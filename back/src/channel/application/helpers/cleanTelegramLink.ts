import { flow } from 'lodash'

const skip = (char: string) => (link: string) => {
  if (!link.includes(char)) {
    return link
  }

  const [channelLink] = link.split(char).reverse()

  return channelLink
}

type CleanTelegramLink = (link: string) => string
export const cleanTelegramLink: CleanTelegramLink = flow([skip('/'), skip('@')])
