import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Protectedroutes from './protectedroutes'

// import from module
import Landing from "../Pages/Landing/landing"
import LoginPage from "../Pages/Login/Login"
import RegisterPage from "../Pages/Register/Register"
import HomePage from "../Pages/Home/home"
import Profile from "../Pages/Profile/Profile"
import AdminDashboard from "../Pages/Admin/AdminDashboard"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}
function RegisterandLogout() {
  localStorage.clear()
  return < Navigate to="/register" />
}

const routes = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  {
    path: "home",
    element:
      (
        <Protectedroutes>
          <HomePage />
        </Protectedroutes>
      ),
  },
  {
    path: "profile",
    element: (
      <Protectedroutes>
        <Profile />
      </Protectedroutes>
    ),
  },
  {
    path: "admin",
    element: (
      <Protectedroutes>
        <AdminDashboard />
      </Protectedroutes>
    ),
  },
  //   { path: "*", element: <NotFound /> },
]);
const AppRoutes = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default AppRoutes
