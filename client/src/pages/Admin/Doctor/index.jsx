import React, { useState } from 'react';
import axios from '../../../utils/axios';
import './doctor.css';

import { Input, Button, Form } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '../../../components/Admin-layout';

const DoctorSignup = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    setLoading(true);
    try {
      const response = await axios.post('/doctor/signup', values);
      toast.success(response.data.message);
      form.resetFields();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout heading="Doctor Signup">
      <div className="signup-container">
        <ToastContainer />
        <h2>Doctor Signup</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="signup-form"
        >
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[
              { required: true, message: 'Please input your department!' },
            ]}
          >
            <Input placeholder="Enter your department" />
          </Form.Item>

          <Form.Item
            label="Hospital"
            name="hospital"
            rules={[
              { required: true, message: 'Please input your hospital name!' },
            ]}
          >
            <Input placeholder="Enter your hospital name" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default DoctorSignup;
