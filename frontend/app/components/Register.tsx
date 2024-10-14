"use client"

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: RegisterForm) => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/auth/register', values);
            message.success('Registration successful!');
        } catch (error) {
            message.error('Registration failed!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form name="register" onFinish={onFinish} layout="vertical">
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your username!' }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
      </Form.Item>
        </Form>
)}

export default Register;
