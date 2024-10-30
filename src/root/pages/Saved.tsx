import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"
import { useGetCurrentUser } from "@/lib/react-query/queries"
import { Models } from "appwrite"

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser()

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse()

  return (
    <div className="flex flex-col flex-1 items-center overflow-scroll py-10 px-5 md:p-14 custom-scrollbar gap-10">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="https://cdn-icons-png.flaticon.com/128/4942/4942550.png"
          alt="save"
          width={36}
          height={36}
        />

        <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] w-full">
          Saved Posts
        </h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-slate-600">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  )
}

export default Saved
