import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"
import SearchResults from "@/components/shared/SearchResults"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounce"
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

const Explore = () => {
  const { ref, inView } = useInView()

  const [searchValue, setSearchValue] = useState("")

  const debouncedSearch = useDebounce(searchValue, 500)

  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch)

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts()

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage()
    }
  }, [inView, searchValue])

  if (!posts) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader />
      </div>
    )
  }

  const showSearchResults = searchValue !== ""

  const showPosts =
    !showSearchResults &&
    posts.pages.every((item) => item.documents.length === 0)

  return (
    <div className="flex flex-col flex-1 items-center overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] w-full">
          Search Posts
        </h2>

        <div className="flex gap-1 px-4 w-full rounded-lg bg-gray-100 items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1076/1076336.png"
            alt=""
            className="w-8 h-8"
          />

          <Input
            type="text"
            placeholder="Search..."
            className="h-12 border border-gray-100 bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target
              setSearchValue(value)
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center w-full max-w-5xl mt-16 mb-7">
        <h3 className="text-[18px] font-bold leading-[140%] tracking-tighter md:text-[24px]">
          Popular Today
        </h3>

        <div className="flex justify-center items-center gap-3 bg-gray-100 rounded-xl px-4 py-2 cursor-pointer">
          <p className="text-[14px] font-medium leading-[140%] md:text-[16px] text-slate-700">
            All
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/128/10833/10833610.png"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {showSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPost={searchedPosts}
          />
        ) : showPosts ? (
          <p>End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore
