import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Rootlayout";
import SignupPage from "./pages/SignupPage";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ path: "/create-account", element: <SignupPage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
