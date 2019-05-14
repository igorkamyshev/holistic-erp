export const getFromStore = store => {
  let value

  const unsubscribe = store.subscribe(data => {
    value = data
  })
  unsubscribe()

  return value
}
