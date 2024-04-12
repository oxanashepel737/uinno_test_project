import { useGetAllPostsQuery } from "../../../store/services/postsQuery.ts";
import { useNavigate } from "react-router-dom";
import { BigLoader } from "../../../components/Loader.tsx";
import PostCard from "../../../components/PostCard.tsx";

const PostsList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllPostsQuery();
  const onGoToCreatePost = () => {
    navigate("/create-post");
  };
  if (isLoading) {
    return <BigLoader />;
  }
  return (
    <div className="flex flex-col p-10">
      <div className="flex flex-row">
        <h1 className="h1-semibold lg:flex-center grow">Posts list</h1>
        <div className="flex-none">
          <button
            className="main_button my-2 h-auto"
            onClick={onGoToCreatePost}
          >
            Add new post
          </button>
        </div>
      </div>
      {data && data.length > 0 ? (
        <section className="flex flex-wrap content-start py-10">
          {data.map((post) => (
            <PostCard key={post.id} data={post} />
          ))}
        </section>
      ) : (
        <div className="flex-col flex-center h-96">
          <img
            src="/assets/no-data-icon.svg"
            alt="No Data"
            width={50}
            height={50}
          />
          <h3 className="h3">No data found</h3>
          <p>Please add new post to see more data</p>
        </div>
      )}
    </div>
  );
};
export default PostsList;
