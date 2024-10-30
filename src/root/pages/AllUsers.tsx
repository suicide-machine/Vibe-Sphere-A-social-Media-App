import Loader from "@/components/shared/Loader"
import UserCard from "@/components/shared/UserCard"
import { useToast } from "@/hooks/use-toast"
import { useGetUsers } from "@/lib/react-query/queries"

const AllUsers = () => {
  const { toast } = useToast()

  const { data: creators, isLoading, isError } = useGetUsers()

  if (isError) {
    toast({ title: "Something went wrong." })

    return
  }

  return (
    <div className="flex flex-col items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar w-full">
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] w-full">
          All Users
        </h2>

        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AllUsers
