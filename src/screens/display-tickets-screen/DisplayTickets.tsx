import React, { useEffect } from "react";
import { Spin, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTicketsAsync, selectTicket } from "../../slices/ticketingSlice";
import "./displayTickets.css";
import TicketTable from "../../components/ticket-table/TicketTable";
import BackButton from "../../components/back-button/BackButton";

const DisplayTickets = () => {
	// const dispatch = useAppDispatch();
	// const { status } = useAppSelector(selectTicket);

	// useEffect(() => {
	// 	dispatch(getTicketsAsync());
	// }, [dispatch]);

	// if (status === "loading") {
	// 	return <Spin />;
	// }

	return (
		<div className="display-tickets-container">
			<Typography.Title
				level={1}
				style={{ fontSize: "2rem" }}
				className="display-tickets-title"
			>
				Tickets
			</Typography.Title>
			<Typography.Title
				level={3}
				style={{ fontSize: "1.2rem" }}
				className="display-tickets-subtitle"
			>
				All tickets are listed below
			</Typography.Title>
			<BackButton url="/ticket-menu" />
			<TicketTable />
		</div>
	);
};

export default DisplayTickets;
