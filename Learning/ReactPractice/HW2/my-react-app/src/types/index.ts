export interface Post {
  id: number
  title: string
  body: string
}

export interface GitHubProfile {
  login: string
  avatar_url: string
  html_url: string
  name?: string
  bio?: string
  public_repos: number
  followers: number
  following: number
}

export interface TodoItem {
  id: string
  text: string
  completed: boolean
}

export interface TaskTimer {
  id: string
  title: string
  elapsed: number
  running: boolean
}

export interface CheckoutFormData {
  name: string
  email: string
  address: string
  cardNumber: string
  expiry: string
  cvv: string
}
