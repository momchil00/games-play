import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext';

const PrivateRoute = ({children}) => {
    const { isAuthenticated } = useContext(AuthContext);
    const confirmation = window.confirm('You need to login');

    if (!isAuthenticated) {
        return (
            <>
        <Navigate to="/login" replace/>
        {confirmation}
        </>
        )
    }

    return (
        <>
        {children}
        </>
    );
}

export default PrivateRoute;