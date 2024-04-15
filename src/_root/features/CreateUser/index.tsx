import UserForm from "../../../components/UserForm.tsx";
import { useCallback, useEffect } from "react";
import { IUserPayload } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../../store/services/usersQuery.ts";
import { useProtectedRoute } from "../../../hook";

const CreateUser = () => {
  const navigate = useNavigate();
  useProtectedRoute();
  const [createUser, { isLoading, isSuccess }] = useCreateUserMutation();
  useEffect(() => {
    if (isSuccess) {
      navigate("/users");
    }
  }, [isSuccess, navigate]);
  const onSubmit = useCallback(
    (values: IUserPayload) => {
      createUser(values);
    },
    [createUser],
  );
  return (
    <UserForm onSubmit={onSubmit} title={"Create User"} isLoading={isLoading} />
  );
};
export default CreateUser;
