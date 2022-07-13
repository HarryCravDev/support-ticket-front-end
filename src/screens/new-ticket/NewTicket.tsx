import React from "react";
import { Typography } from "antd";
import "./newTicket.css";
import NewTicketForm from "../../components/new-ticket-form/NewTicketForm";
import BackButton from "../../components/back-button/BackButton";

const NewTicket = () => {
	return (
		<div className="new-ticket-container" style={{ position: "relative" }}>
			<BackButton url="/ticket-menu" />
			<section style={{ textAlign: "center" }}>
				<Typography.Title
					level={1}
					style={{ marginBottom: "0.5rem", fontSize: "2rem" }}
				>
					Create New Ticket
				</Typography.Title>
				<Typography.Title
					level={3}
					style={{
						marginBottom: "1.5rem",
						marginTop: 0,
						opacity: 0.5,
						fontSize: "1.2rem",
					}}
				>
					Please fill in the form below
				</Typography.Title>
			</section>
			<section>
				<NewTicketForm />
			</section>
		</div>
	);
};

export default NewTicket;
