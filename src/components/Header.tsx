import { Link, useLocation } from "react-router-dom";
import { PathEnums } from "../constants";
import { useDispatch } from "react-redux";
import { authApiService, useAuthMeQuery } from "../store/services/authQuery.ts";
import { postsApiService } from "../store/services/postsQuery.ts";
import { usersApiService } from "../store/services/usersQuery.ts";
import { BigLoader } from "./Loader.tsx";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, data } = useAuthMeQuery();
  const onLogout = () => {
    dispatch(authApiService.util.resetApiState());
    dispatch(postsApiService.util.resetApiState());
    dispatch(usersApiService.util.resetApiState());
    localStorage.clear();
  };
  if (isLoading) {
    return <BigLoader />;
  }
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
            <li>
              <Link
                to={PathEnums.Posts}
                className={
                  PathEnums.Posts === location.pathname
                    ? "selected_router_link"
                    : "router_link"
                }
                aria-current="page"
              >
                Posts
              </Link>
            </li>
            {data?.role === "admin" && (
              <li>
                <Link
                  to={PathEnums.Users}
                  className={
                    PathEnums.Users === location.pathname
                      ? "selected_router_link"
                      : "router_link"
                  }
                >
                  Users
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
