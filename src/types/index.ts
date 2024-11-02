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

export type NewPost = {
  userId: string
  caption: string
  file: File[]
  location?: string
  tags?: string
}

export type UpdatePost = {
  postId: string
  caption: string
  imageId: string
  imageUrl: URL
  file: File[]
  location?: string
  tags?: string
}

export type UpdateUser = {
  userId: string
  name: string
  imageId: string
  imageUrl: URL | string
  bio: string
  file: File[]
}
