import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";
import {
  CreateUser,
  UserProfile,
  UsersList,
  CreatePost,
  PostProfile,
  PostsList,
} from "./_root/features";
import SignIn from "./_auth/features/SignIn";
import { PathEnums } from "./constants";
import NotFoundPage from "./components/NotFoundPage.tsx";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/*public routes*/}
        <Route element={<AuthLayout />}>
          <Route path={PathEnums.SignIn} element={<SignIn />} />
        </Route>
        {/*private routes*/}
        <Route element={<RootLayout />}>
          <Route path={"/"} element={<Navigate to="/posts" replace />} />
          <Route index path={"/posts"} element={<PostsList />} />
          <Route path={PathEnums.Users} element={<UsersList />} />
          <Route path={`${PathEnums.Users}/:id`} element={<UserProfile />} />
          <Route path={PathEnums.CreateUser} element={<CreateUser />} />
          <Route path={PathEnums.CreatePost} element={<CreatePost />} />
          <Route path={`${PathEnums.Posts}/:id`} element={<PostProfile />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
