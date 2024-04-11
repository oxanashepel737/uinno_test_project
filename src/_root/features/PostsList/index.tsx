import { useGetAllPostsQuery } from "../../../store/services/postsQuery.ts";
import { useNavigate } from "react-router-dom";
import { BigLoader } from "../../../components/Loader.tsx";

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
    <div className="flex flex-row p-10 min-h-full">
      <div className="flex-auto">
        <h1 className="h1-semibold lg:flex-center">Posts list</h1>
        {data && data.length > 0 ? (
          <div>Posts</div>
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
      <div className=" rtl:space-x-reverse">
        <button className="main_button h-auto" onClick={onGoToCreatePost}>
          Add new post
        </button>
      </div>
    </div>
  );
};
export default PostsList;
