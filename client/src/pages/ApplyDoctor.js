import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  return (
    <Layout>
      <h1 className="text-center layoutbg" >Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3 layoutbg">
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              className="layoutformitem"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              className="layoutformitem"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              className="layoutformitem"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Conatact Number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              className="layoutformitem"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="Email Address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website" className="layoutformitem">
              <Input type="text" placeholder="Website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              className="layoutformitem"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Clinic address" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              className="layoutformitem"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              className="layoutformitem"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Cunsaltation"
              name="feesPerCunsaltation"
              className="layoutformitem"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Fees" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" className="layoutformitem" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;