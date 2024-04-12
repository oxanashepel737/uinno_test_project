import { useGetAllUsersQuery } from "../../../store/services/usersQuery.ts";
import { BigLoader } from "../../../components/Loader.tsx";
import UserCard from "../../../components/UserCard.tsx";
import ListPageComponent from "../../../components/ListPageComponent.tsx";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllUsersQuery();
  if (isLoading) {
    return <BigLoader />;
  }
  const onGoToCreateUser = () => {
    navigate("/create-user");
  };
  const CardSection = () => {
    return (
      <section className="flex flex-wrap content-start py-10">
        {data?.map((user) => <UserCard key={user.id} data={user} />)}
      </section>
    );
  };
  return (
    <>
      <ListPageComponent
        title={"Users list"}
        button_name={"Add new user"}
        Card={CardSection}
        isRendering={!!(data && data.length > 0)}
        onGoToCreate={onGoToCreateUser}
      />
    </>
  );
};
export default UsersList;
