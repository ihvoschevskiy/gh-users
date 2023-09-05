import { IRepository, IUser } from '../../types/api.types'

const MODE = process.env.NODE_ENV
const API_ROUTE =
  MODE === 'production'
    ? `${process.env.PROD_HOST}:${process.env.PORT}${process.env.ROUTE}`
    : `${process.env.DEV_HOST}:${process.env.PORT}${process.env.ROUTE}`

export const getUsers = async (query?: string): Promise<IUser[]> => {
  return query ? await fetchWrapper(`${API_ROUTE}/search/users?q=${query}`) : await fetchWrapper(`${API_ROUTE}/users`)
}

export const getUserById = async (id: string): Promise<IUser> => {
  return await fetchWrapper(`${API_ROUTE}/users/${id}`)
}

export const getRepositories = async (id: string): Promise<IRepository[]> => {
  return await fetchWrapper(`${API_ROUTE}/users/${id}/repos?sort=pushed`)
}

const fetchWrapper = async <T>(url: string, config: RequestInit = {}): Promise<T> => {
  return await fetch(url, config).then<T>(response => {
    if (!response.ok) {
      if (response.status === 404) throw new Error('Page not found')
    }
    return response.json()
  })
}
