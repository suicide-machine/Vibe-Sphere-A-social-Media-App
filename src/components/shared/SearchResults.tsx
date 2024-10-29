import GridPostList from "./GridPostList"
import Loader from "./Loader"

type SearchResultProps = {
  isSearchFetching: boolean
  searchedPost: any
}

const SearchResults = ({
  isSearchFetching,
  searchedPost,
}: SearchResultProps) => {
  if (isSearchFetching) {
    return (
      <div className="flex justify-center items-center w-full">
        <Loader />
      </div>
    )
  } else if (searchedPost && searchedPost.documents.length > 0) {
    return <GridPostList posts={searchedPost.documents} />
  }

  return (
    <p className="text-slate-600 mt-10 text-center w-full">No result found</p>
  )
}

export default SearchResults
