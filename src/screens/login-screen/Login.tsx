import { Typography } from "antd";
import React from "react";
import LoginForm from "../../components/login-form/LoginForm";
import "./login.css";

const Login = () => {
	return (
		<section className="login-container" style={{ height: "91vh" }}>
			<Typography.Title
				level={1}
				style={{ marginBottom: "1.5rem", fontSize: "2rem" }}
			>
				Login to your account
			</Typography.Title>
			<LoginForm />
		</section>
	);
};

export default Login;
