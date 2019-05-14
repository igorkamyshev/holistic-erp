export const getFromStore = (store) => {
  let value

  console.log(store)

  const unsubscribe = store.subscribe((data) => {
    value = data
  })
  unsubscribe()

  return value
}