import qs from 'qs'

import { Parameters } from '../Parameters'

export const makeUrl = (template: string, params: Parameters): string => {
  const args = Object.entries(params).map(([key, value]) => ({ key, value }))

  let url = template
  const query: Record<string, string> = {}

  for (const { key, value } of args) {
    const templateKey = `:${key}`
    const urlValue = value.toString()

    if (url.includes(templateKey)) {
      url = url.replace(templateKey, urlValue)
    } else {
      query[key] = urlValue
    }
  }

  return `${url}?${qs.stringify(query)}`
}
