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
	const { isLoggedIn, user } = useAppSelector(selectUser);
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [selectInputChange, setSelectInputChange] = useState(false);
	const textareaRef = useRef<TextAreaRef | null>(null);
	console.log("data: ", user);
	console.log("email: ", user.email);

	// const onFinish = async ({ name, email, password, confirmPassword }: any) => {
	const onFinish = async ({
		name,
		email,
		product,
		description,
	}: ICreateTicket) => {
		// Todo - dispatch action to create a new ticket
		const res = await dispatch(
			createTicketAsync({ userId: user._id, name, email, product, description })
		);
		// Todo - If successful, navigate to the ticket menu; maybe a show an alert?
		// Todo - If unsuccessful, show an unsuccessful alert?
		console.log("Component: ", res);
		// if (res.payload.user) {
		// 	navigate("/ticket-menu");
		// } else {
		// 	setShowAlert(true);
		// 	setAlertMessage(res.payload.response.data.message);
		// 	const timer = setTimeout(() => {
		// 		setShowAlert(false);
		// 		clearTimeout(timer);
		// 	}, 3000);
		// }
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div>
			{showAlert && (
				<Alert
					style={{ marginBottom: "1rem" }}
					message={alertMessage}
					type="error"
					showIcon
				/>
			)}
			<Form
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				// style={{ width: "500px" }}
				layout="vertical"
				className="new-ticket-form-container"
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
