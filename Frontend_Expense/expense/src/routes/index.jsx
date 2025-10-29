import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '../pages/Login/Login'
// import PrivateRoute from './privateroutes'
import RegisterPage from '../pages/Register/Register'
import Landing from '../pages/Landing/landing'
const routes = createBrowserRouter([
    {
        path:"/",element: <Landing/>
    },
    {
        path:"/login",element:<LoginPage/>
    },
    {
        path:"/register",element:<RegisterPage/>
    }
])
const AppRoutes = () => {
  return (
    <RouterProvider router={routes}/>
  )
}

export default AppRoutes