import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import LoginPage from '../pages/Login/Login'
import RegisterPage from '../pages/Register/Register'
import Landing from '../pages/Landing/Landing'
import HomePage from '../pages/Homepage/Homepage'
import AddExpense from '../pages/Homepage/addExpense/addExpense'
import AddIncome from '../pages/Homepage/addIncome/addIncome'
import ViewReports from '../pages/Homepage/viewReport/viewReport'
import SetBudget from '../pages/Homepage/setBudget/setBudget'
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
        element: 
        (
          <Protectedroutes>
            <HomePage />
          </Protectedroutes>
        ),
      },
      {
        path:"/add-income",
        element:
        <Protectedroutes>
          <AddIncome/>
        </Protectedroutes>
      },
      {
        path:"home/add-expense",
        element:
        <Protectedroutes>
          <AddExpense/>
        </Protectedroutes>
      },
      {
        path:"home/set-Budget",
        element:
        <Protectedroutes>
          <SetBudget/>
        </Protectedroutes>
      },
      {
        path:"home/view-report",
        element:
        <Protectedroutes>
          <ViewReports/>
        </Protectedroutes>
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