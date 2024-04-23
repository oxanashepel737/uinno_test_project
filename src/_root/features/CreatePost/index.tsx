import { PostPayload } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../../store/services/postsQuery.ts";
import { useCallback, useEffect } from "react";
import { PostForm } from "../../../components/PostForm.tsx";

const CreatePost = () => {
  const navigate = useNavigate();
  const [createPost, { isSuccess, isLoading }] = useCreatePostMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/posts");
    }
  }, [isSuccess, navigate]);

  const onSubmit = useCallback(
    (values: PostPayload) => {
      createPost(values);
    },
    [createPost],
  );

  return (
    <PostForm onSubmit={onSubmit} isLoading={isLoading} title={"Create Post"} />
  );
};
export default CreatePost;
