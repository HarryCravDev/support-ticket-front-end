import { RollbackOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

const BackButton = ({ url }: { url: string }) => {
	return (
		<Button
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				marginTop: "0.5rem",
				marginLeft: "0.5rem",
			}}
		>
			<Link to={url}>
				<RollbackOutlined /> Back
			</Link>
		</Button>
	);
};
export default BackButton;
