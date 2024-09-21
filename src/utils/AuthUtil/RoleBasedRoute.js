import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '~/utils/AuthUtil/Auth'; // Giả sử bạn có một hook để lấy thông tin người dùng

const RoleBasedRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const { user } = useAuth();

    const hasAccess = user && allowedRoles.includes(user.role);

    if (hasAccess) {
        return <Navigate to="/" />;
    }

    return hasAccess ? <Component {...rest} /> : <Navigate to="/" />;
};

export default RoleBasedRoute;
