import { RollbackOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const BackButton = ({ url }: { url: string }) => {
	return (
		<Link to={url}>
			<RollbackOutlined /> Back
		</Link>
	);
};
export default BackButton;
