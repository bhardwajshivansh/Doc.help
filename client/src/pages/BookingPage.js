import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "antd";

const BookingPage = () => {
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [data, setDate] = useState();
  const [timings, setTimings] = useState();
  const [isAvailable, setIsAVAILABLE] = useState();
  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/vi/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr.{doctors.firstname}
              {doctors.lastname}
            </h4>
            <h5>Fees:{doctors.feesperCunsaltation}</h5>
            <h5>
              Timings :{doctors.timings[0]}-{doctors.timings[1]}
            </h5>
            <div className="d-flex flex-column w-50">
              <DatePicker 
              className="m-2"
                format="DD-MM-YY"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <TimePicker.RangePicker
                format="HH:mm"
                onChange={(values) =>
                  setTimings([
                    moment(values[0]).format("HH:mm"),
                    moment(values[1]).format("HH:mm"),
                  ])
                }
              />
              <button className="btn-btn-primary mt-2">
                Check Availability
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default BookingPage;
