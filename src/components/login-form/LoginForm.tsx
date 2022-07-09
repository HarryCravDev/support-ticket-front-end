import { Button, Checkbox, Form, Input, Alert } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userLoginAsync, selectUser } from "../../slices/userSlices";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isLoggedIn } = useAppSelector(selectUser);
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	const onFinish = async (values: { email: string; password: string }) => {
		const res = await dispatch(userLoginAsync(values));

		if (res.payload.user) {
			navigate("/");
		} else {
			setShowAlert(true);
			setAlertMessage(res.payload.response.data.message);
			const timer = setTimeout(() => {
				setShowAlert(false);
				clearTimeout(timer);
			}, 3000);
		}
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
				// labelCol={{ span: 8 }}
				// wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				style={{ width: "500px" }}
				layout="vertical"
			>
				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{
							type: "email",
							message: "The input is not valid E-mail!",
						},
						{
							required: true,
							message: "Please input your E-mail!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: "Please input your password!" }]}
				>
					<Input.Password />
				</Form.Item>

				{/* <Form.Item
				name="remember"
				valuePropName="checked"
				wrapperCol={{ offset: 8, span: 16 }}
			>
				<Checkbox>Remember me</Checkbox>
			</Form.Item> */}

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LoginForm;
