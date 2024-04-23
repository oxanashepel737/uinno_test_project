import { useGetAllUsersQuery } from "../../../store/services/usersQuery.ts";
import { BigLoader } from "../../../components/Loader.tsx";
import UserCard from "../../../components/UserCard.tsx";
import ListPageComponent from "../../../components/ListPageComponent.tsx";
import { useNavigate } from "react-router-dom";
import { useProtectedRoute } from "../../../hook";

const UsersList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllUsersQuery();
  useProtectedRoute();
  if (isLoading) {
    return <BigLoader />;
  }
  const onGoToCreateUser = () => {
    navigate("/create-user");
  };
  return (
    <>
      <ListPageComponent
        title={"Users list"}
        button_name={"Add new user"}
        isRendering={!!(data && data.length > 0)}
        onGoToCreate={onGoToCreateUser}
      >
        <section className="flex flex-wrap content-start py-10">
          {data?.map((user) => <UserCard key={user.id} data={user} />)}
        </section>
      </ListPageComponent>
    </>
  );
};
export default UsersList;
