import { BigLoader } from "../../../components/Loader.tsx";
import { useParams } from "react-router-dom";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../../store/services/postsQuery.ts";
import { useCallback, useEffect } from "react";
import { PostPayload } from "../../../types";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/features/toastSlice.ts";
import { PostForm } from "../../../components/PostForm.tsx";
import { useErrorRedirect, useProtectedParam } from "../../../hook";
const PostProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [updatePost, { isSuccess, isLoading: isLoadingUpdate }] =
    useUpdatePostMutation();
  const { data, isLoading: isLoadingGet, error } = useGetPostQuery(Number(id));
  useProtectedParam(Number(data?.userId));
  useErrorRedirect(error, "/");

  const onSubmit = useCallback(
    (values: PostPayload) => {
      updatePost({
        id: Number(id),
        post: values,
      });
    },
    [id, updatePost],
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showToast({
          type: "success",
          text: "This post was successfully updated",
        }),
      );
    }
  }, [dispatch, isSuccess]);

  if (isLoadingGet) {
    return <BigLoader />;
  }

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
