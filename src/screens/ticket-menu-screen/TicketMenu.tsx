import { Button, Typography } from "antd";
import React from "react";
import { QuestionCircleOutlined, FileDoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ticketMenu.css";

const TicketMenu = () => {
	const navigate = useNavigate();

	return (
		<section className="ticket-menu-container">
			<Typography.Title level={2} className="ticket-menu-title">
				What do you need help with?
			</Typography.Title>
			<Typography.Paragraph className="ticket-menu-para">
				Please choose from an option below
			</Typography.Paragraph>
			<div>
				<Button
					onClick={() => navigate("/new-ticket")}
					type="primary"
					size="large"
					className="create-ticket-btn"
					// style={{ marginRight: "1rem" }}
				>
					<QuestionCircleOutlined />
					Create New Ticket
				</Button>
				<Button
					onClick={() => navigate("/tickets")}
					type="primary"
					size="large"
					className="view-ticket-btn"
					// style={{ marginRight: "1rem" }}
				>
					<FileDoneOutlined />
					View My Tickets
				</Button>
			</div>
		</section>
	);
};

export default TicketMenu;
