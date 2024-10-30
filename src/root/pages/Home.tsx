import Loader from "@/components/shared/Loader"
import PostCard from "@/components/shared/PostCard"
import UserCard from "@/components/shared/UserCard"
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries"
import { Models } from "appwrite"

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts()

  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUsers(10)

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">
            Home Feed
          </h2>

          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="hidden lg:flex flex-col w-172 xl:w-465 px-6 py-10 gap-10 overflow-scroll custom-srollbar">
        <h3 className="text-[24px] font-bold leading-[140%] tracking-tighter">
          Top Creator
        </h3>

        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid lg:grid-cols-2 gap-6">
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

export default Home
