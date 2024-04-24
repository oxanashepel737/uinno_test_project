import { Link, useLocation } from "react-router-dom";
import { PathEnums } from "../constants";
import { useDispatch } from "react-redux";
import { authApiService, useAuthMeQuery } from "../store/services/authQuery.ts";
import { clearSession } from "../store/features/authSlice.ts";
import { postsApiService } from "../store/services/postsQuery.ts";
import { usersApiService } from "../store/services/usersQuery.ts";
import { BigLoader } from "./Loader.tsx";
import { ReactNode } from "react";

const LinkComponent = ({ title, path }: { title: string; path: string }) => {
  const location = useLocation();
  return (
    <li>
      <Link
        to={path}
        className={
          path === location.pathname ? "selected_router_link" : "router_link"
        }
        aria-current="page"
      >
        {title}
      </Link>
    </li>
  );
};

const RenderRoleHeader = ({ children }: { children: ReactNode }) => {
  const { isLoading, data } = useAuthMeQuery();
  if (isLoading) {
    return <BigLoader />;
  }
  {
    return data?.role === "admin" && children;
  }
};

const useHeader = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(authApiService.util.resetApiState());
    dispatch(postsApiService.util.resetApiState());
    dispatch(usersApiService.util.resetApiState());
    dispatch(clearSession());
  };
  return { onLogout };
};

export const Header = () => {
  const { onLogout } = useHeader();
  return (
    <nav className="bg-light-1 border-gray-200 dark:bg-dark-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="main_button" onClick={onLogout}>
            Log out
          </button>
        </div>
        <div
          className="items-center justify-between flex w-auto order-1"
          id="navbar-cta"
        >
          <ul className="navbar">
            <LinkComponent title={"Posts"} path={PathEnums.Posts} />
            <RenderRoleHeader>
              <LinkComponent title={"Users"} path={PathEnums.Users} />
            </RenderRoleHeader>
          </ul>
        </div>
      </div>
    </nav>
  );
};
