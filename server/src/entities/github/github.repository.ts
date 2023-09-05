import axios, { AxiosResponse } from 'axios'
import * as T from './github.api.types'

export const getUsers = async (query?: string): Promise<T.IUserListApi[]> => {
  return query
    ? await fetchWrapper<AxiosResponse>(
        `https://api.github.com/search/users?q=${query}&per_page=15`,
      )
        .then(response => response.data)
        .then(response => response.items)
    : await fetchWrapper<AxiosResponse>('https://api.github.com/users?per_page=15').then(
        response => response.data,
      )
}

export const getUserById = async (id: string): Promise<T.IUserListApi> => {
  return await fetchWrapper<AxiosResponse>(`https://api.github.com/users/${id}`).then(
    response => response.data,
  )
}

export const getDetailUserData = async (userUrl: string): Promise<T.IUserApi> => {
  return await fetchWrapper<AxiosResponse>(userUrl).then(response => response.data)
}

export const getFirstOrganizationName = async (orgsUrl: string): Promise<string> => {
  const organizationsList = await fetchWrapper<AxiosResponse>(orgsUrl).then(
    response => response.data,
  )
  let name = ''

  for (const organization of organizationsList) {
    const details = await fetchWrapper<AxiosResponse>(organization.url).then(
      response => response.data,
    )
    if (details.name) {
      name = details.name
      break
    }
  }
  return name
}

export const getRepositories = async (id: string): Promise<T.IRepositoryAPI[]> => {
  return await fetchWrapper<AxiosResponse>(
    `https://api.github.com/users/${id}/repos?sort=pushed&per_page=10`,
  ).then(response => response.data)
}

const fetchWrapper = async <T>(url: string): Promise<T> => {
  const config = {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }

  return await axios(url, config)
}
