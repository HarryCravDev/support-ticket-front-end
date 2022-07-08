import { PageHeader, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();

	return (
		<div style={{ height: "9vh" }}>
			<PageHeader
				className="site-page-header"
				title="Support Ticket System"
				style={{ backgroundColor: "#f0f0f0" }}
				extra={[
					<Button onClick={() => navigate("login")} key="1" type="primary">
						Login
					</Button>,
					<Button onClick={() => navigate("register")} key="2" type="primary">
						Register
					</Button>,
				]}
			/>
		</div>
	);
};

export default Header;
