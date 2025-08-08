import { createBrowserRouter } from "react-router";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import User from "./components/users/User";

let router = createBrowserRouter([
  //   {
  //     // path: "/",
  //     // Component: Home,
  //     errorElement: <NotFound />,
  //     // children: [
  //     //   {
  //     //     path: "/about",
  //     //     Component: About,
  //     //   },
  //     //   {
  //     //     path: "/user/:login",
  //     //     Component: User,
  //     //   },
  //     // ],
  //   },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  //   {
  //     path: "/user/:login",
  //     element: <User />,
  //   },
]);

export default router;
