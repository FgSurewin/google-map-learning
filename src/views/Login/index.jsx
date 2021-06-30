import React from "react";
import Navbar from "../../components/Navbar";
import { Form, Input, Button } from "antd";
import { FormWrapper, LoginText, LoginContainer } from "./LoginStyle";
import { NavLink } from "react-router-dom";
// import { useScroll } from "../../hooks/useScroll";

export default function Login() {
	const onFinish = (values) => {
		console.log("Success:", values);
	};

	return (
		<div>
			<Navbar primary={"white"} />
			<LoginContainer justify={"center"} align={"middle"}>
				<FormWrapper span={20}>
					<LoginText>
						<strong>Don't have an account? </strong>
						<NavLink to="/signUp">Sign Up</NavLink>
					</LoginText>
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 8 }}
						//initialValues={{ remember: true }}
						onFinish={onFinish}>
						<Form.Item
							label="Email"
							name="email"
							rules={[{ required: true, message: "Please input your email!" }]}>
							<Input />
						</Form.Item>
						<Form.Item
							label="Password"
							name="password"
							rules={[
								{ required: true, message: "Please input your password!" },
							]}>
							<Input.Password />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Log In
							</Button>
						</Form.Item>
					</Form>
				</FormWrapper>
			</LoginContainer>
		</div>
	);
}
