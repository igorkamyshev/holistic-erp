export const common = store => {
  store.on('@init', () => ({
    common: {
      loaded: false,
      forbidden: false,
    },
  }))

  store.on('common/loaded', ({ common }) => ({
    common: {
      ...common,
      loaded: true,
    },
  }))

  store.on('common/forbid', ({ common }) => ({
    common: {
      ...common,
      forbidden: true,
    },
  }))
}
