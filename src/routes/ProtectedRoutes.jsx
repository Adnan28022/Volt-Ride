import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useSelector((state) => state.auth);

    // Debugging ke liye console logs
    console.log("Current User Role:", user?.role);
    console.log("Allowed Roles for this Route:", allowedRoles);

    

    if (!user) {
        console.log("Access Denied: User is not logged in. Redirecting to /login...");
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        const redirectPath = user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
        console.log(`Access Denied: Role '${user?.role}' is not authorized. Redirecting to ${redirectPath}...`);
        return <Navigate to={redirectPath} replace />;
    }

    console.log("Access Granted: Rendering component via <Outlet />");
    return <Outlet />;
};

export default ProtectedRoute;