import { NewUser } from "@/types"
import { useMutation } from "react-query"
import {
  createUserAccount,
  signInAccount,
  signOutAccount,
} from "../appwrite/api"

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUser) => createUserAccount(user),
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  })
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  })
}
