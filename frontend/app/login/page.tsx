"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Input, Button, Form, notification } from 'antd';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      notification.success({ message: 'Login successful!' });
      // Lưu token vào localStorage hoặc cookies (tuỳ nhu cầu của bạn)
      localStorage.setItem('token', response.data.access_token);
      // console.log('to1111', localStorage.getItem('token'));
      // console.log('res 111', response);
      router.push('/profile'); // Điều hướng tới trang chính sau khi đăng nhập thành công
    } catch (error) {
      notification.error({ message: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}>
      <h2>Login</h2>
      <Form onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
