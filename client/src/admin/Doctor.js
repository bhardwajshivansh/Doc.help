import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { text } from "express";

const Doctor = () => {
  const [doctors, setDoctors] = useState({});
  //getDoctors
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: 'Bearer ${localstorage.getItem("token")}',
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-felx">
          {record.status == "pending" ? (
            <button className="btn-btn-success">Approve</button>
          ) : (
            <button className="btn-btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1> All Doctors</h1>
    </Layout>
  );
};
export default Doctors;
