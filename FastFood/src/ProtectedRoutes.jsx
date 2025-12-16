import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext/UserContext';

const ProtectedRoutes = ({ roles }) => {
    const { user } = useContext(UserContext);
    if (user) {
        if (!roles || (roles === 'admin' && user.role === 'admin')) {
            return <Outlet />
        }
        else if (!roles || (roles === 'delivery' && user.role === 'delivery')) {
            return <Outlet />
        }
        else if (!roles || (roles === 'customer' && user.role === 'customer')) {
            return <Outlet />
        }
        else {
            return <Navigate to='/' />
        }
    }
    else {
        if (roles === 'noUser') {
            return <Outlet />
        }
        return <Navigate to='/' />
    }
}

export default ProtectedRoutes;