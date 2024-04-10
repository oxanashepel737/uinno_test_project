import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks.ts";

const AuthLayout = () => {
  const isAuthorized = useAppSelector((state) => state.authState.accessToken);
  return (
    <>
      {isAuthorized ? (
        <Navigate to={"/posts"} />
      ) : (
        <section className="flex flex-1 justify-center items-center flex-col py-10">
          <Outlet />
        </section>
      )}
    </>
  );
};
export default AuthLayout;
