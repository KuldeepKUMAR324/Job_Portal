import React, { useState } from 'react'
import './App.css'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login' 
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'

 const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />

  },
   {
    path: '/login',
    element: <Login />
    
  },
   {
    path: '/signup',
    element: <Signup />
   
    
  },
  {
    path: '/jobs',
    element: <Jobs />
   
    
  },
   {
    path: '/browse',
    element: <Browse />
   
    
  },
 {
  path: '/description/:id', 
  element: <JobDescription />
}
,
  {
    path: '/profile',
    element: <Profile />
   
    
  },


]);
  


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={appRouter}/>
     
      
      
    </>
  )
}

export default App
