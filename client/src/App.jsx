import './App.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import HomeLayout from './components/HomeLayout'
import Landing from './components/Landing'
import SignUp from './components/SignUp'
import Login from './components/Login'
import TodoList from './components/TodoList'

const router=createBrowserRouter([
  {
  path:"/",
  element:<HomeLayout/>,
  children:[
    {
      path:"/",
      element:<Landing/>
    },
    {
      path:"signup",
      element:<SignUp/>
    },
    {
      path:"login",
      element:<Login/>
    },
    {
      path:"todolist",
      element:<TodoList/>
    }
  
  ]
}
])

function App() {
  
  return <RouterProvider router={router}/>
}

export default App
