interface Configuration {
  telegramBotName: string
  apiUrl: string
}

export const getConfig = (): Configuration => {
  if (process.env.NODE_ENV !== 'production') {
    return {
      telegramBotName: 'bid_poster_bot',
      apiUrl: 'http://localhost:3000',
    }
  }

  return {
    telegramBotName: 'holistic_erp_bot',
    apiUrl: 'https://api.holistic-erp.ru',
  }
}
