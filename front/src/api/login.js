import { createApi } from "./createApi";

export const login = (email, password) => {
  console.log(email, password)

  const api = createApi()

  const success = Math.random() > 0.5

  if (success) {
    return Promise.resolve()
  }

  return Promise.reject()
}