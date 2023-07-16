import * as T from './github.api.types'
import * as repository from './github.repository'

export const getUsers = async (query?: string): Promise<T.IUser[]> => {
  const users: T.IUserListApi[] = await repository.getUsers(query)

  const userDetails: T.IUser[] = []
  for (const user of users) {
    const [details, organization] = await Promise.all([
      repository.getDetailUserData(user.url),
      repository.getFirstOrganizationName(user.organizations_url),
    ])
    userDetails.push({
      avatar_url: user.avatar_url,
      blog: details.blog,
      followers: details.followers,
      following: details.following,
      html_url: user.html_url,
      login: user.login,
      name: details.name,
      organization: organization,
      organizations_url: user.organizations_url,
      public_repos: details.public_repos,
      repos_url: user.repos_url,
      url: user.url,
    })
  }
  return userDetails
}

export const getUserById = async (id: string): Promise<T.IUser> => {
  const user: T.IUserListApi = await repository.getUserById(id)
  const details: T.IUserApi = await repository.getDetailUserData(user.url)
  return {
    avatar_url: details.avatar_url,
    blog: details.blog,
    followers: details.followers,
    following: details.following,
    html_url: user.html_url,
    login: details.login,
    name: details.name,
    organizations_url: details.organizations_url,
    public_repos: details.public_repos,
    repos_url: details.repos_url,
    url: details.url,
  }
}

export const getReposByUser = async (id: string): Promise<T.IRepository[]> => {
  const listOfRepositories = await repository.getRepositories(id)
  return listOfRepositories
    .map(item => {
      return {
        name: item.name,
        description: item.description,
        private: item.private,
        html_url: item.html_url,
      }
    })
    .filter(item => !item.private)
}
