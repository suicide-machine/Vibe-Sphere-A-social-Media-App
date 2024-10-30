import { Models } from "appwrite"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

type UserCardProps = {
  user: Models.Document
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      to={`/profile/${user.$id}`}
      className="flex justify-center items-center flex-col gap-4 rounded-[20px] px-5 py-8 w-full border border-slate-400"
    >
      <img
        src={
          user.imageUrl ||
          "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
        }
        alt=""
        className="rounded-full w-14 h-14"
      />

      <div className="flex justify-center items-center flex-col gap-1">
        <p className="text-[16px] font-medium leading-[140%] text-slate-900 text-center line-clamp-1">
          {user.name}
        </p>

        <p className="text-[14px] font-normal leading-[140%] text-slate-600 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size={"sm"} className="bg-blue-500 px-5">
        Follow
      </Button>
    </Link>
  )
}

export default UserCard
