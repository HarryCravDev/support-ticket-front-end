import React, { useRef, useState } from "react";
import { Button, Checkbox, Form, Input, Alert, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userRegisterAsync, selectUser } from "../../slices/userSlice";
import { createTicketAsync } from "../../slices/ticketingSlice";
import { useNavigate } from "react-router-dom";
import TextArea, { TextAreaRef } from "antd/lib/input/TextArea";
import ICreateTicket from "../../types/ICreateTicket";
import "./newTicketForm.css";

const NewTicketForm = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(selectUser);
	const navigate = useNavigate();
	const [alertData, setAlertData] = useState({
		type: "success",
		message: "",
		show: false,
	});
	const [form] = Form.useForm();

	const onFinish = async ({
		name,
		email,
		product,
		description,
	}: ICreateTicket) => {
		const res = await dispatch(
			createTicketAsync({ userId: user._id, name, email, product, description })
		);

		if (res.payload._id) {
			form.resetFields();

			setAlertData({
				type: "success",
				message: `Ticket created successfully, ${res.payload._id}`,
				show: true,
			});

			// todo - timer too slow... needs improving
			const timer = setTimeout(() => {
				setAlertData((previous) => ({ ...previous, show: false }));
				clearTimeout(timer);
				navigate("/ticket-menu");
			}, 1000);
		} else {
			setAlertData({
				type: "error",
				message: `Something went wrong, ticket not created. Error message: ${res.payload.response.data.message}`,
				show: false,
			});
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div>
			{alertData.show && (
				<Alert
					style={{ marginBottom: "1rem" }}
					message={alertData.message}
					// Todo - Create type for this
					type={
						alertData.type as
							| "success"
							| "info"
							| "warning"
							| "error"
							| undefined
					}
					showIcon
				/>
			)}
			{/* {showAlert && (
				<Alert
					style={{ marginBottom: "1rem" }}
					message={alertMessage}
					type="error"
					showIcon
				/>
			)} */}
			<Form
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				// style={{ width: "500px" }}
				layout="vertical"
				className="new-ticket-form-container"
				form={form}
			>
				<Form.Item initialValue={user.name} label="Customer Name" name="name">
					<Input value={user.name} disabled />
				</Form.Item>

				<Form.Item
					initialValue={user.email}
					label="Customer Email"
					name="email"
				>
					<Input value={user.email} disabled />
				</Form.Item>

				<Form.Item
					initialValue={null}
					label="Product"
					name="product"
					rules={[{ required: true, message: "Please select a product!" }]}
				>
					<Select style={{ width: "100%" }}>
						{/* Todo: Request product data from the server instead of hardcode...   */}
						{["MacBook Pro", "MacBook Air", "iPhone", "iPad"].map(
							(product, index) => (
								<Select.Option key={index} value={product}>
									{product}
								</Select.Option>
							)
						)}
					</Select>
				</Form.Item>

				<Form.Item
					label="Description"
					name="description"
					rules={[{ required: true, message: "Please provide a description!" }]}
				>
					<TextArea placeholder="Description" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" style={{ width: "100%" }}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default NewTicketForm;
