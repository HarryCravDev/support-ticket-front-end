import React, { useEffect } from "react";
import { Card, Divider, Spin, Tag, Button } from "antd";
import {
	selectTicket,
	getTicketAsync,
	updateTicketAsync,
} from "../../slices/ticketingSlice";
import { selectUser } from "../../slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useParams } from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import TicketCommentContainer from "../../components/ticket-comment-container/TicketCommentContainer";
import TicketCommentInput from "../../components/ticket-comment-input/TicketCommentInput";
import "./ticket.css";

const Ticket = () => {
	const { ticket, status, isError, isSuccess, message } =
		useAppSelector(selectTicket);
	const { user } = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const { ticketId } = useParams();
	console.log("Params: ", ticketId);
	console.log("Users: ", user);
	console.log("Ticket: ", ticket);

	useEffect(() => {
		if (isError) {
			// todo - add alert component to display error message 🚧
			console.log("Error: ", message);
		}

		dispatch(
			getTicketAsync({ userId: user._id, ticketId: ticketId as string })
		);
	}, [isError, message, ticketId]);

	const onCloseTicket = async () => {
		// todo - Use type here...
		const updateTicket = {
			ticketId: ticketId as string,
			userId: user._id,
			product: ticket.product,
			description: ticket.description,
			status: "closed",
		};

		await dispatch(updateTicketAsync(updateTicket));
	};

	const onReopenTicket = async () => {
		// todo - Use type here...
		const updateTicket = {
			ticketId: ticketId as string,
			userId: user._id,
			product: ticket.product,
			description: ticket.description,
			status: "in progress",
		};

		console.log("update...: ", updateTicket);

		await dispatch(updateTicketAsync(updateTicket));
	};

	if (status === "loading") {
		return (
			// todo - centre this spinner 🚧
			<div className="">
				<Spin size="large" />
			</div>
		);
	}

	if (isError) {
		return (
			// todo - centre this message or add alert component
			<div>
				<h1>Something went wrong... 🚧 </h1>
			</div>
		);
	}

	return (
		<div className="ticket-page-container">
			<BackButton url="/tickets" />
			<div className="ticket-header-container">
				<h1 className="ticket-title">Ticket ID: {ticketId}</h1>
				<Tag
					color={
						ticket.status === "open"
							? "green"
							: ticket.status === "in progress"
							? "blue"
							: "red"
					}
					key={status}
					className="ticket-status-tag"
				>
					{ticket.status}
				</Tag>
			</div>
			<h1 className="ticket-date-title">
				Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-GB")}
			</h1>
			<h1 className="ticket-product-title">Product: {ticket.product}</h1>

			<Divider />
			<Card
				title="Description of Issue"
				type="inner"
				bordered={true}
				style={{ width: "100%" }}
			>
				{ticket.description}
			</Card>
			{/* // todo - create a reopen button, conditional display depending on ticket.status value  */}
			{ticket.status === "open" || ticket.status === "in progress" ? (
				<Button
					type="primary"
					className="close-ticket-button"
					onClick={onCloseTicket}
					danger
					block
				>
					Close Ticket
				</Button>
			) : (
				<Button
					type="primary"
					className="close-ticket-button"
					onClick={onReopenTicket}
					block
				>
					Re-Open Ticket
				</Button>
			)}
			<h1>Ticket Comments...</h1>
			<TicketCommentInput />
			<TicketCommentContainer />
		</div>
	);
};

export default Ticket;
