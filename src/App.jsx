import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function App() {
 
  const user = useSelector((state) => state.user.username);

  console.log("redux:", user);
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Navigate to="/login" />,
      // element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      // element: <Login />,
    },
  ]);



  return (
    <div>
      <Toaster />
      <RouterProvider router={appRouter} />
    </div>
  );
}
