import { IPostPayload } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../../store/services/postsQuery.ts";
import { useEffect } from "react";
import PostForm from "../../../components/PostForm.tsx";

const CreatePost = () => {
  const navigate = useNavigate();
  const [createPost, { isSuccess, isLoading }] = useCreatePostMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/posts");
    }
  }, [isSuccess, navigate]);

  const onSubmit = (values: IPostPayload) => {
    createPost(values);
  };

  return (
    <PostForm onSubmit={onSubmit} isLoading={isLoading} title={"Create Post"} />
  );
};
export default CreatePost;
