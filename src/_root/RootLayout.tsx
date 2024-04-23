import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components/Header.tsx";
import { useAppSelector } from "../store/hooks.ts";

export const RootLayout = () => {
  const isAuthorized = useAppSelector((state) => state.authState.accessToken);
  return (
    <>
      {isAuthorized ? (
        <div className="w-full flex flex-col">
          <Header />
          <section className="h-full">
            <Outlet />
          </section>
        </div>
      ) : (
        <Navigate to={"/sign-in"} />
      )}
    </>
  );
};
