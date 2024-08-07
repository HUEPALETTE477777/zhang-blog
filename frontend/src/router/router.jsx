import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Home from "../pages/home/home"
import About from "../pages/sub-pages/about"
import Contact from "../pages/sub-pages/contact"
import SingleBlog from "../pages/sub-pages/singleBlog"
import Login from "../pages/user/login"
import Register from "../pages/user/register"
import AdminLayout from "../pages/admin/adminLayout"
import Dashboard from "../pages/admin/dashboard/dashboard"
import CreatePost from "../pages/admin/post/createPost"
import ManageUsers from "../pages/admin/user/manageUsers"
import ManagePosts from "../pages/admin/post/managePosts"
import EditPost from "../pages/admin/post/editPost"
import PrivateRouter from "./privateRouter"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/blogs/:id",
                element: <SingleBlog />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/dashboard",
                element: <PrivateRouter> <AdminLayout/> </PrivateRouter>,
                children: [
                    {
                        path: "",
                        element: <Dashboard />
                    },
                    {
                        path: "create-post",
                        element: <CreatePost />
                    },
                    {
                        path: "manage-post",
                        element: <ManagePosts />
                    },
                    {
                        path: "manage-users",
                        element: <ManageUsers />
                    },
                    {
                        path: "edit-post/:id",
                        element: <EditPost />
                    }
                ]
            }
        ]
    },
]);

export default router