import { Api } from "."

export const login = (account: any) => {
  return Api.post(`/users/login`, account)
}

export const register = (account: any) => {
  return Api.post(`/users/register`, account)
}

export const getAccessToken = (account: any) => {
  return Api.post(`users/token/`)
}
