import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const RouteGuard = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const confirmation = window.confirm('You need to login');

    if (!isAuthenticated) {
        return (
            <>
                <Navigate to="/login" replace />
                {confirmation}
            </>
        )
    }

    return <Outlet />
}

export default RouteGuard;