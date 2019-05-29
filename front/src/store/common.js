export const common = store => {
  store.on('@init', () => ({
    common: {
      loaded: false,
      forbidden: false,
    },
  }))

  store.on('common/loaded', state => ({
    common: {
      ...state.common,
      loaded: true,
    },
  }))

  store.on('common/forbid', state => ({
    common: {
      ...state.common,
      forbidden: true,
    },
  }))
}
