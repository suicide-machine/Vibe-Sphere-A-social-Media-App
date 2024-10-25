export type NewUser = {
  name: string
  email: string
  username: string
  password: string
}

export type User = {
  id: string
  name: string
  username: string
  email: string
  imageUrl: string
  bio: string
}

export type NavLinkTypes = {
  imgUrl: string
  route: string
  label: string
}
