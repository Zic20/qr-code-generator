import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AuthUserProvider } from "./firebase/auth";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/*",
    element: <Home />,
  },
]);
function App() {
  return (
    <AuthUserProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthUserProvider>
  );
}

export default App;
