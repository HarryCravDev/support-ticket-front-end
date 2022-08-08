import React, { useEffect } from "react";
import { Space, Table, Tag, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
const { Column, ColumnGroup } = Table;
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTicketsAsync, selectTicket } from "../../slices/ticketingSlice";
import "./ticketTable.css";

interface DataType {
	_id: string;
	key: React.Key;
	createdAt: string;
	product: string;
	status: string;
}

const TicketTable = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { status, tickets } = useAppSelector(selectTicket);

	useEffect(() => {
		dispatch(getTicketsAsync());
	}, [dispatch]);

	if (status === "loading" || !tickets) {
		return <Spin />;
	}

	return (
		<Table dataSource={tickets}>
			<Column
				title="Date"
				dataIndex="createdAt"
				key="createdAt"
				render={(date: string) => new Date(date).toLocaleString()}
			/>
			<Column title="Product" dataIndex="product" key="product" />
			<Column
				title="Status"
				dataIndex="status"
				key="status"
				className="status-column"
				render={(status: string) => (
					<Tag
						color={
							status === "open"
								? "green"
								: status === "in progress"
								? "blue"
								: "red"
						}
						key={status}
						className="status-tag"
					>
						{status}
					</Tag>
				)}
			/>
			<Column
				title="Action"
				key="action"
				render={(_: any, ticket: DataType) => (
					<Button
						type="primary"
						onClick={() => navigate(`/tickets/${ticket._id}`)}
					>
						View
					</Button>
				)}
			/>
		</Table>
	);
};

export default TicketTable;
