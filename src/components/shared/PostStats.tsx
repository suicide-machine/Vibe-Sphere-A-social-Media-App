import { useUserContext } from "@/context/AuthContext"
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries"
import { checkedIsLiked } from "@/lib/utils"
import { Models } from "appwrite"
import React, { useEffect, useState } from "react"

type PostStatsProps = {
  post: Models.Document
  userId: string
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id)

  const [likes, setLikes] = useState<string[]>(likesList)
  const [isSaved, setIsSaved] = useState(false)

  const { mutate: likePost } = useLikePost()
  const { mutate: savePost } = useSavePost()
  const { mutate: deleteSavePost } = useDeleteSavedPost()

  const { data: currentUser } = useGetCurrentUser()

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()

    let likesArray = [...likes]

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId)
    } else {
      likesArray.push(userId)
    }

    setLikes(likesArray)

    likePost({ postId: post.$id, likesArray: likesArray })
  }

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  )

  useEffect(() => {
    setIsSaved(savedPostRecord ? true : false)
  }, [currentUser])

  const handleSavedPost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()

    if (savedPostRecord) {
      setIsSaved(false)

      return deleteSavePost(savedPostRecord.$id)
    }

    savePost({ userId: userId, postId: post.$id })

    setIsSaved(true)
  }

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkedIsLiked(likes, userId)
              ? "https://cdn-icons-png.flaticon.com/128/2107/2107845.png"
              : "https://cdn-icons-png.flaticon.com/128/1000/1000621.png"
          }`}
          alt=""
          width={24}
          height={24}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />

        <p className="text-[14px] font-medium leading-[140%] lg:text-[16px]">
          {likes.length}
        </p>
      </div>

      <div className="flex gap-2">
        <img
          src={
            isSaved
              ? "https://cdn-icons-png.flaticon.com/128/4942/4942550.png"
              : "https://cdn-icons-png.flaticon.com/128/25/25667.png"
          }
          alt=""
          width={24}
          height={24}
          onClick={(e) => handleSavedPost(e)}
          className="cursor-pointer"
        />
      </div>
    </div>
  )
}

export default PostStats
