import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"
import { useUserContext } from "@/context/AuthContext"
import Loader from "./Loader"

type GridPostListProps = {
  posts: Models.Document[]
  showUser?: boolean
  showStats?: boolean
}

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext()

  if (!posts) {
    return <Loader />
  }

  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-6xl">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link
            to={`/posts/${post.$id}`}
            className="flex rounded-[24px] border border-slate-400 overflow-hidden cursor-pointer w-full h-full"
          >
            <img
              src={post.imageUrl}
              alt="post image"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="absolute bottom-0 p-5 flex justify-between items-center w-full rounded-b-[24px] gap-2">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />

                <p className="line-clamp-1 text-blue-500 font-bold">
                  {post?.creator?.name}
                </p>
              </div>
            )}

            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GridPostList
