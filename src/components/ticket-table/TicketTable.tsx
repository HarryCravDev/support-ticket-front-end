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

	const getProductFilters = () => {
		const filters: any = tickets
				.map(ticket => { return { text: ticket.product, value: ticket.product } })
				.filter((value: any, index: number, self: any[]) => index === self.findIndex((t) => t.text === value.text));
		return filters;
	}

	const getDateFilters = () => {
		const filters: any = tickets.map(ticket => {

			const date = new Date(ticket.createdAt);
			return { text: date.toLocaleDateString(), value: date.toLocaleDateString()
		}}).filter((value: any, index: number, self: any[]) => index === self.findIndex((t) => t.text === value.text));
		return filters;
	}

	return (
		<Table dataSource={tickets}>
			<Column
				title="Date"
				dataIndex="createdAt"
				key="createdAt"
				render={(date: string) => new Date(date).toLocaleString()}
				filters={getDateFilters()}
				filterSearch={true}
				onFilter={(value: string | number | boolean, record: any) => {
					const date = new Date(record.createdAt);
					return date.toLocaleDateString().startsWith(value as string)
				}}
				responsive={['md']}
			/>
			<Column 
				title="Product" 
				dataIndex="product" 
				key="product"
				filters={getProductFilters()}
				filterSearch={true}
				onFilter={(value: string | number | boolean, record: any) => record.product.startsWith(value)} 
				/>
			<Column
				title="Status"
				dataIndex="status"
				key="status"
				className="status-column"
				filters={
					[
						{ text: "open", value: "open" },
						{ text: "in progress", value: "in progress" },
						{ text: "closed", value: "closed" },
					]
				}
				onFilter={(value: string | number | boolean, record: any) => record.status.indexOf(value) === 0}
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
						key={ticket._id}
					>
						View
					</Button>
				)}
			/>
		</Table>
	);
};

export default TicketTable;
