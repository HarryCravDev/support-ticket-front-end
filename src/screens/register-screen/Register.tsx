import { Typography } from "antd";
import React from "react";
import RegisterForm from "../../components/register-form/RegisterForm";

const Register = () => {
	return (
		<section className="login-container" style={{ height: "91vh" }}>
			<Typography.Title level={1} style={{ marginBottom: "1.5rem" }}>
				Register to your account
			</Typography.Title>
			<RegisterForm />
		</section>
	);
};

export default Register;
