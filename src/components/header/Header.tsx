import { PageHeader, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUser, logout } from "../../slices/userSlices";
import {
	LogoutOutlined,
	LoginOutlined,
	UserAddOutlined,
} from "@ant-design/icons";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isLoggedIn } = useAppSelector(selectUser);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<div style={{ height: "9vh" }}>
			<PageHeader
				className="site-page-header"
				title="Support Ticket System"
				style={{ backgroundColor: "#f0f0f0" }}
				extra={
					!isLoggedIn ? (
						[
							<Button onClick={() => navigate("login")} key="1" type="primary">
								<LoginOutlined />
								Login
							</Button>,
							<Button
								onClick={() => navigate("register")}
								key="2"
								type="primary"
							>
								<UserAddOutlined />
								Register
							</Button>,
						]
					) : (
						<Button onClick={handleLogout} key="1" type="primary">
							<LogoutOutlined />
							Logout
						</Button>
					)
				}
			/>
		</div>
	);
};

export default Header;
