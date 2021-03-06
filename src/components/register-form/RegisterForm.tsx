import { Button, Checkbox, Form, Input, Alert } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userRegisterAsync, selectUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import IRegisterFormValues from "../../types/IRegisterValues";
import "./registerForm.css";

const RegisterForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isLoggedIn } = useAppSelector(selectUser);
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	const onFinish = async ({
		email,
		name,
		password,
		confirmPassword,
	}: IRegisterFormValues) => {
		if (password !== confirmPassword) {
			setShowAlert(true);
			setAlertMessage("Passwords do not match");
			const timer = setTimeout(() => {
				setShowAlert(false);
				clearTimeout(timer);
			}, 3000);
			return;
		}

		const res = await dispatch(
			userRegisterAsync({ email, name, password, confirmPassword })
		);

		if (res.payload.user) {
			navigate("/ticket-menu");
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
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				// style={{ width: "500px" }}
				className="register-form-container"
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
					label="Name"
					name="name"
					rules={[{ required: true, message: "Please input your password!" }]}
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

				<Form.Item
					label="Confirm Password"
					name="confirmPassword"
					rules={[{ required: true, message: "Please input your password!" }]}
				>
					<Input.Password />
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

export default RegisterForm;
