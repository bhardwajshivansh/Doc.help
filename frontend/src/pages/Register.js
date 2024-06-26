import React from "react";
import "../styles/RegisterStyles.css";

import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://doc-help-rouge.vercel.app/user/register",
        values
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong!");
    }
  };
  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onfinishHandler} className="card">
        <h1 className="text-center">DOC.HELP</h1>
        <Form.Item label="Name" name="name">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/login" className="registerlink">
          ALREADY A USER
        </Link>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </Form>
    </div>
  );
};

export default Register;
