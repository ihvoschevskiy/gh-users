export interface IUser {
  avatar_url: string
  blog: string
  followers: number
  following: number
  html_url: string
  login: string
  name: string
  organization?: string
  organizations_url: string
  public_repos: number
  repos_url: string
  repositories?: IRepository[]
  url: string
}

export interface IRepository {
  name: string
  description: string
  private: boolean
  html_url: string
}
