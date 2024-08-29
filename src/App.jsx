import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/Rootlayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import BlogPage from "./pages/BlogPage";
import signupAction from "./util/actions/SignupAction";
import loginAction from "./util/actions/LoginAction";
import getBlogsLoader from "./util/loaders/getBlogsLoader";
import getBlogByIdLoader from "./util/loaders/getBlogByIdLoader";
import createBlogAction from "./util/actions/CreateBlogAction";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: getBlogsLoader,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
        action: createBlogAction,
      },
      {
        path: "/create-account",
        element: <SignupPage />,
        action: signupAction,
      },
      { path: "/login", element: <LoginPage />, action: loginAction },
      {
        path: "blog/:blogId",
        element: <BlogPage />,
        loader: getBlogByIdLoader,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
