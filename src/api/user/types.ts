export type LoginParams = {
  login: string
  password: string
}

export type LoginResponse = {
  id: number
  login: string
  name: string
  age: number
}

export type UserType = LoginResponse
