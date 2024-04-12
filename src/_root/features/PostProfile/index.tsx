import { BigLoader } from "../../../components/Loader.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../../store/services/postsQuery.ts";
import { useEffect } from "react";
import { IPostPayload } from "../../../types";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/features/toastSlice.ts";
import PostForm from "../../../components/PostForm.tsx";

const PostProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updatePost, { isSuccess, isLoading: isLoadingUpdate }] =
    useUpdatePostMutation();
  const { data, isLoading: isLoadingGet } = useGetPostQuery(Number(id));
  console.log(data);
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showToast({
          type: "success",
          text: "This post was successfully updated",
        }),
      );
    }
  }, [dispatch, isSuccess, navigate]);

  if (isLoadingGet) {
    return <BigLoader />;
  }

  const onSubmit = (values: IPostPayload) => {
    updatePost({
      id: Number(id),
      post: values,
    });
  };

  return (
    <PostForm
      data={data}
      onSubmit={onSubmit}
      isLoading={isLoadingUpdate}
      title={"Update Post"}
    />
  );
};
export default PostProfile;
