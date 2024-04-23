import { useGetAllPostsQuery } from "../../../store/services/postsQuery.ts";
import { useNavigate } from "react-router-dom";
import { BigLoader } from "../../../components/Loader.tsx";
import PostCard from "../../../components/PostCard.tsx";
import ListPageComponent from "../../../components/ListPageComponent.tsx";

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
    <>
      <ListPageComponent
        title={"Posts list"}
        button_name={"Add new post"}
        isRendering={!!(data && data.length > 0)}
        onGoToCreate={onGoToCreatePost}
      >
        <section className="flex flex-wrap content-start py-10">
          {data?.map((post) => <PostCard key={post.id} data={post} />)}
        </section>
      </ListPageComponent>
    </>
  );
};
export default PostsList;
