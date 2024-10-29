import Loader from "@/components/shared/Loader"
import PostStats from "@/components/shared/PostStats"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useDeletePost, useGetPostById } from "@/lib/react-query/queries"
import { multiFormatDateString } from "@/lib/utils"
import { Link, useNavigate, useParams } from "react-router-dom"

const PostDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useUserContext()

  const { data: post, isLoading } = useGetPostById(id)

  const { mutate: deletePost } = useDeletePost()

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId })

    navigate(-1)
  }

  return (
    <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 items-center custom-scrollbar">
      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="bg-gray-200 w-full max-w-5xl rounded-[30px] flex flex-col xl:flex-row border border-slate-400 xl:rounded-l-[24px]">
          <img
            src={post?.imageUrl}
            alt="post image"
            className="h-80 lg:h-[480px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5"
          />

          <div className="bg-gray-200 flex flex-col gap-5 lg:gap-7 flex-1 items-start p-8 rounded-[30px]">
            <div className="flex justify-between items-center w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post.creator?.imageUrl ||
                    "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />

                <div className="flex flex-col gap-1">
                  <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold text-slate-900">
                    {post.creator.name}
                  </p>

                  <div className="flex justify-center items-center gap-1 text-slate-600">
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                      {multiFormatDateString(post.$createdAt)}
                    </p>
                    -
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                      {post.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex justify-center items-center gap-4">
                <Link
                  to={`/update-post/${post.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1160/1160515.png"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  variant={"ghost"}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                  onClick={handleDeletePost}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/14090/14090243.png"
                    alt="delete"
                    width={26}
                    height={26}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-slate-400" />

            <div className="flex flex-col flex-1 w-full text-[14px] font-medium leading-[140%] lg:text-[16px]">
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

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails
