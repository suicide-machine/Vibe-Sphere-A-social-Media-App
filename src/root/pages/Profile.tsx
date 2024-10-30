import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useGetUserById } from "@/lib/react-query/queries"
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom"
import LikedPosts from "./LikedPosts"

const Profile = () => {
  const { id } = useParams()
  const { user } = useUserContext()
  const { pathname } = useLocation()

  const { data: currentUser } = useGetUserById(id || "")

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="flex items-center md:mb-8 lg:items-start gap-8 flex-col lg:flex-row relative max-w-5xl w-full">
        <div className="flex lg:flex-row flex-col max-lg:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl ||
              "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />

          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center lg:text-left text-[24px] font-bold leading-[140%] tracking-tighter md:text-[36px] md:font-semibold w-full">
                {currentUser.name}
              </h1>

              <p className="text-[14px] font-normal leading-[140%] md:text-[18px] md:font-medium text-slate-700 text-center lg:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 items-center mt-10 justify-center lg:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div>

            <p className="text-[14px] font-medium leading-[140%] md:text-[16px] text-center lg:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-gray-100 px-5 text-slate-900 flex justify-center items-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1160/1160515.png"
                  alt="edit"
                  width={20}
                  height={20}
                />

                <p className="flex whitespace-nowrap text-[14px] font-medium leading-[140%]">
                  Edit Profile
                </p>
              </Link>
            </div>

            <div className={`${user.id === id && "hidden"}`}>
              <Button type="button" className="bg-blue-500 px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full gap-4">
          <Link
            to={`/profile/${id}`}
            className={`flex justify-center items-center gap-3 py-4 w-48 bg-gray-200 flex-1 lg:flex-initial rounded-l-lg ${
              pathname === `/profile/${id}`
            }`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/4612/4612366.png"
              alt="posts"
              className="w-12 h-12"
            />
            Posts
          </Link>

          <Link
            to={`/profile/${id}/liked-posts`}
            className={`flex justify-center items-center gap-3 py-4 w-48 bg-gray-200 flex-1 lg:flex-initial rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts`
            }`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
              alt="like"
              className="w-12 h-12"
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />

        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
    </div>
  )
}

interface StatBlockProps {
  value: string | number
  label: string
}

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex justify-center items-center gap-2">
    <p className="text-[14px] font-semibold leading-[140%] tracking-tighter lg:text-[18px] lg:font-bold text-blue-500">
      {value}
    </p>

    <p className="text-slate-700">{label}</p>
  </div>
)

export default Profile
