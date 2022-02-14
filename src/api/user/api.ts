import axios from 'axios'
import { LoginParams, LoginResponse } from '@/api/user/types'

const config = axios.create({})

export const userApi = {
  login({ login, password }: LoginParams): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (login === 'admin' && password === '1234')
          resolve({
            id: 10,
            login: 'admin',
            name: 'Сергей',
            age: 18,
          })
        else reject(new Error('Пользователь не найден. Проверьте введенные данные'))
      }, 1000)
    })
  },
}
