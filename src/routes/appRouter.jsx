
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import LoginFrom from '../layout/LoginForm';
import RegisterFrom from '../layout/RegisterForm';
import useAuth from '../hooks/useAuth';
import Header from '../layout/Header';
import UserHome from '../layout/UserHome';

const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Header />
            <hr />
            <Outlet />
        </>,
        children: [
            { index: true, element: <LoginFrom /> },
            { path: '/register', element: <RegisterFrom /> }
        ]
    }
]);

const userRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Header />
            <hr />
            <Outlet />
            <UserHome />
        </>,
        children: [
            { index: true, element: <p className='mt-5 px-5'>User Home / Dashboard</p> },
            { path: '/', element: <p className='mt-5 px-5'>New Todo Form</p> }
        ]
    }
])

export default function appRoute() {
    const { user } = useAuth()
    const finalRouter = user?.user_id ? userRouter : guestRouter
    return (
        <RouterProvider router={finalRouter} />
    )
}