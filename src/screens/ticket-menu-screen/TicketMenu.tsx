import { Button, Typography } from "antd";
import React from "react";
import { QuestionCircleOutlined, FileDoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ticketMenu.css";

const TicketMenu = () => {
	const navigate = useNavigate();

	return (
		<section className="ticket-menu-container">
			<Typography.Title
				level={2}
				style={{ marginBottom: "0", fontSize: "2rem" }}
			>
				What do you need help with?
			</Typography.Title>
			<Typography.Paragraph style={{ opacity: 0.5, fontSize: "1.5rem" }}>
				Please choose from an option below
			</Typography.Paragraph>
			<div>
				<Button
					onClick={() => navigate("/new-ticket")}
					type="primary"
					size="large"
					style={{ marginRight: "1rem" }}
				>
					<QuestionCircleOutlined />
					Create New Ticket
				</Button>
				<Button type="primary" size="large" style={{ marginRight: "1rem" }}>
					<FileDoneOutlined />
					View My Tickets
				</Button>
			</div>
		</section>
	);
};

export default TicketMenu;
