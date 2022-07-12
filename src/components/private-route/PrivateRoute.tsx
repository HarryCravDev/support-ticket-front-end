import { Spin } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../../hooks/useAuthStatus";

const PrivateRoute = () => {
	const { isLoggedIn, checkingStatus } = useAuthStatus();

	if (checkingStatus) {
		return <Spin size="large" />;
	}

	return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
