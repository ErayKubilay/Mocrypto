import { createBrowserRouter } from "react-router-dom"

import  App  from './App.jsx'
import  Contact from './pages/contactpage.jsx'
import  Home  from './pages/homepage.jsx'
import  About  from './pages/aboutpage.jsx'
import SignUpPage from './pages/signuppage.jsx'
import LoginPage from "./pages/loginpage.jsx"
import Admin from "./pages/adminpage.jsx";
import User from "./pages/userpage.jsx";
import ProtectedRoute from "./protectedroute.jsx";

const isAuthenticated =false; // Replace with actual authentication logic

export const router = createBrowserRouter([
    {path:"/", element: <App/>},
    {path:"/home", element: <Home/>},
    {path:"/contact-us", element: <Contact/>},
    {path:"/about", element: <About/>},
    {path:"/log-in", element: <LoginPage/>},
    {path:"/sign-up", element: <SignUpPage/>},
    {path:"/userxxx", element: <User/>},
    { 
        path: "/admin", 
        element: (
            <ProtectedRoute>
                <Admin/>
            </ProtectedRoute>
        ) 
    },
]);