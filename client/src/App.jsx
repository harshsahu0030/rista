import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense} from "react";
import { AuthenticatedUser, Authentication, Every } from "./Layout";
import Error from "./pages/Error";
import PageLoader from "./components/Loader/PageLoader";


//every
const ForgotPassword = lazy(() =>
  import("./pages/authentication/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./pages/authentication/ResetPassword")
);

//authentication
const Login = lazy(() => import("./pages/authentication/Login"));
const Register = lazy(() => import("./pages/authentication/Register"));
const RegisterOtp = lazy(() => import("./pages/authentication/RegisterOtp"));

//authenticated
const Home = lazy(() => import("./pages/home/Home"));
const Friends = lazy(() => import("./pages/friends/Friends"));
const RequestFriend = lazy(() => import("./pages/friends/RequestFriend"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const SingleChat = lazy(() => import("./pages/chat/SingleChat"));
const Groups = lazy(() => import("./pages/groups/Groups"));
const CreateGroup = lazy(() => import("./pages/groups/CreateGroup"));
const Notification = lazy(() => import("./pages/Notification"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const UpdateProfile = lazy(() => import("./pages/profile/UpdateProfile"));
const AddPost = lazy(() => import("./pages/profile/AddPost"));
const Search = lazy(() => import("./pages/search/Search"));
const RecentSearches = lazy(() => import("./pages/search/RecentSearches"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const ChangePassword = lazy(() =>
  import("./pages/authentication/ChangePassword")
);

const App = () => {


  const router = createBrowserRouter([
    //Every
    {
      path: "/about",
      element: <Every />,
      errorElement: <Error />,
      children: [
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password/:token",
          element: <ResetPassword />,
        },
      ],
    },

    //authentication
    {
      path: "/",
      element: <Authentication />,
      errorElement: <Error />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "register",
          children: [
            {
              index: true,
              element: <Register />,
            },
            {
              path: ":id",
              element: <RegisterOtp />,
            },
          ],
        },
      ],
    },

    //authenticated
    {
      path: "/",
      element: <AuthenticatedUser />,
      errorElement: <Error />,
      children: [
        {
          path: "home",
          element: <Home />,
        },

        {
          path: "friends",
          children: [
            {
              index: true,
              element: <Friends />,
            },
            {
              path: "request",
              element: <RequestFriend />,
            },
          ],
        },
        {
          path: "messenger",
          children: [
            {
              index: true,
              element: <Chat />,
            },
            {
              path: ":id",
              element: <SingleChat />,
            },
          ],
        },
        {
          path: "groups",
          children: [
            {
              index: true,
              element: <Groups />,
            },
            {
              path: "create",
              element: <CreateGroup />,
            },
          ],
        },
        {
          path: "notification",
          element: <Notification />,
        },
        {
          path: "bookmarks",
          element: <Bookmarks />,
        },
        {
          path: "profile",
          children: [
            {
              index: true,
              element: <Profile />,
            },

            {
              path: "update",
              element: <UpdateProfile />,
            },
            {
              path: "addpost",
              element: <AddPost />,
            },
            {
              path: "password",
              element: <ChangePassword />,
            },
          ],
        },
        {
          path: "search",
          children: [
            {
              index: true,
              element: <Search />,
            },
            {
              path: "recent",
              element: <RecentSearches />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
