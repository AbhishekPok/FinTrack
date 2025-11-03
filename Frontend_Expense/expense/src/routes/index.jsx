import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '../pages/Login/Login'
import RegisterPage from '../pages/Register/Register'
import Landing from '../pages/Landing/landing'
import HomePage from '../pages/Homepage/Homepage'

const routes = createBrowserRouter([
    {
        path:"/",element: <Landing/>
    },
    {
        path:"/login",element:<LoginPage/>
    },
    {
        path:"/register",element:<RegisterPage/>
    },
    {
        path:"/home",element:<HomePage/>
    }
])
const AppRoutes = () => {
  return (
    <RouterProvider router={routes}/>
  )
}

export default AppRoutes