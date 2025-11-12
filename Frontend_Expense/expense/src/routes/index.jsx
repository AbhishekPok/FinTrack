import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import LoginPage from '../pages/Login/Login'
import RegisterPage from '../pages/Register/Register'
import Landing from '../pages/Landing/Landing'
import HomePage from '../pages/Homepage/Homepage'
import NotFound from '../pages/Notfound/notfound'
import Protectedroutes from '../routes/protectedroutes'

function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
}
function RegisterandLogout() {
    localStorage.clear()
    return< Navigate to="/register"/>
}

const routes = createBrowserRouter([
      { path: "/", element: <Landing /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "home",
        element: (
          <Protectedroutes>
            <HomePage />
          </Protectedroutes>
        ),
      },
      { path: "*", element: <NotFound /> },
      { path: "logout", element : <logout />},
]);
const AppRoutes = () => {
  return (
    <RouterProvider router={routes}/>
  )
}

export default AppRoutes