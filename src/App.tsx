import './App.css'
import {Route, Routes} from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";
import {CreateUser, UserProfile, UsersList, CreatePost, PostProfile, PostsList} from "./_root/features";
import SignIn from "./_auth/features/SignIn";
import {PathEnums} from "./constants";

function App() {

    return (
        <main className='flex h-screen'>
            <Routes>
                {/*public routes*/}
                <Route element={<AuthLayout/>}>
                    <Route path={PathEnums.SignIn} element={<SignIn/>}/>
                </Route>
                {/*private routes*/}
                <Route element={<RootLayout/>}>
                    <Route index path={PathEnums.Posts} element={<PostsList/>}/>
                    <Route path={PathEnums.Users} element={<UsersList/>}/>
                    <Route path={`${PathEnums.Users}/:id`} element={<UserProfile/>}/>
                    <Route path={PathEnums.CreateUser} element={<CreateUser/>}/>
                    <Route path={PathEnums.CreatePost} element={<CreatePost/>}/>
                    <Route path={`${PathEnums.Posts}/:id`} element={<PostProfile/>}/>
                </Route>
            </Routes>
        </main>
    )
}

export default App
