import { createApi } from "./createApi";

export const register = (email, password, team) => {
  console.log(email, password)
  console.log(team.exist, team.name)

  const api = createApi()

  const success = Math.random() > 0.5

  if (success) {
    return Promise.resolve()
  }

  return Promise.reject()
}