import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ProfileSchema } from "@/lib/validation"
import { useUserContext } from "@/context/AuthContext"
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queries"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import ProfileUploader from "@/components/shared/ProfileUploader"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const UpdateProfile = () => {
  const { id } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()

  const { user, setUser } = useUserContext()

  // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  })

  // Queries
  const { data: currentUser } = useGetUserById(id || "")
  const { mutateAsync: updateUser, isLoading: isLoadingUpdate } =
    useUpdateUser()

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    )
  }

  // 2. Define a submit handler.
  const handleUpdate = async (values: z.infer<typeof ProfileSchema>) => {
    const updatedUser = await updateUser({
      userId: currentUser.$id,
      name: values.name,
      bio: values.bio,
      file: values.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    })

    if (!updatedUser) {
      toast({
        title: "Update user failed. Please try again!",
      })
    }

    setUser({
      ...user,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl,
    })

    return navigate(`/profile/${id}`)
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14 overflow-scroll custom-scrollbar">
        <div className="max-w-5xl flex justify-start items-center gap-3 w-full">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1160/1160515.png"
            alt="add"
            width={36}
            height={36}
          />

          <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">
            Edit Profile
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-7 w-full mt-4 max-w-5xl"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser.imageUrl}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                      disabled
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                      disabled
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>

                  <FormControl>
                    <Textarea
                      className="h-36 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end">
              <Button type="button" className="h-12 px-5 bg-red-500 flex gap-2">
                Cancel
              </Button>

              <Button
                type="submit"
                className="h-12 px-5 bg-green-500 flex gap-2 whitespace-nowrap"
                disabled={isLoadingUpdate}
              >
                {isLoadingUpdate && <Loader />}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default UpdateProfile
