import React, { useEffect } from "react";
import { Space, Table, Tag, Button, Spin } from "antd";
const { Column, ColumnGroup } = Table;
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTicketsAsync, selectTicket } from "../../slices/ticketingSlice";

interface DataType {
	key: React.Key;
	createdAt: string;
	product: string;
	status: string;
}

const TicketTable = () => {
	const dispatch = useAppDispatch();
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
				render={(status: string) => (
					<Tag
						color={
							status === "open"
								? "blue"
								: status === "in progress"
								? "red"
								: "green"
						}
						key={status}
					>
						{status}
					</Tag>
				)}
			/>
			<Column
				title="Action"
				key="action"
				render={(_: any, ticket: DataType) => (
					<Button type="primary">View</Button>
				)}
			/>
		</Table>
	);
};

export default TicketTable;
