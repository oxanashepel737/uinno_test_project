import { useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../store/services/usersQuery.ts";
import UserForm from "../../../components/UserForm.tsx";
import { useCallback, useEffect } from "react";
import { IUserPayload } from "../../../types";
import { BigLoader } from "../../../components/Loader.tsx";
import { showToast } from "../../../store/features/toastSlice.ts";
import { useDispatch } from "react-redux";
import { useErrorRedirect, useProtectedRoute } from "../../../hook";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data,
    isLoading: isLoadingGetUser,
    error,
  } = useGetUserQuery(Number(id));
  const [updateUser, { isLoading: isLoadingUpdateUser, isSuccess }] =
    useUpdateUserMutation();
  useProtectedRoute();
  useErrorRedirect(error, "/users");
  const onSubmit = useCallback(
    (values: IUserPayload) => {
      updateUser({
        id: Number(id),
        user: values,
      });
    },
    [id, updateUser],
  );
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showToast({
          type: "success",
          text: "This user was successfully updated",
        }),
      );
    }
  }, [dispatch, isSuccess]);

  if (isLoadingGetUser) {
    return <BigLoader />;
  }
  return (
    <UserForm
      onSubmit={onSubmit}
      isLoading={isLoadingUpdateUser}
      title={"Update User"}
      data={data}
    />
  );
};
export default UserProfile;
