import { useUserContext } from "@/context/AuthContext"
import { multiFormatDateString } from "@/lib/utils"
import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"

type PostCardProps = {
  post: Models.Document
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext()

  if (!post.creator) return

  return (
    <div className="bg-gray-100 rounded-xl border border-slate-400 p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold text-slate-900">
              {post.creator.name}
            </p>

            <div className="flex justify-center items-center gap-2 text-slate-600">
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                {multiFormatDateString(post.$createdAt)}
              </p>
              -
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/1160/1160515.png"
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="text-[14px] font-medium leading-[140%] lg:text-[16px] py-5">
          <p>{post.caption}</p>

          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li
                key={`${tag}${index}`}
                className="text-slate-600 text-[14px] font-normal leading-[140%]"
              >
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={
            post.imageUrl ||
            "https://images.pexels.com/photos/29097735/pexels-photo-29097735/free-photo-of-tranquil-autumn-canal-with-reflective-water.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          alt="post image"
          className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5"
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  )
}

export default PostCard
