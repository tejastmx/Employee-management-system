import React, { useState, useEffect } from "react";
import Information from "../components/Information";
// import DatePicker from "react-datePicker";
// import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function Addinfo() {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [postMsg, setPostMsg] = useState("");
  const [delMsg, setDelMsg] = useState("");
  const [infoData, setInfoData] = useState([]);

  // getting data

  useEffect(() => {
    axios
      .get("/info")
      .then((res) => {
        console.log(res.data);
        setInfoData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [infoData]);

  ///posting data
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeOccupation = (e) => {
    setOccupation(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  // const onChangeDate = (e) => {
  //   setDate(e.target.value);
  //   console.log(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemdata = {
      name,
      occupation,
      email,
      date: e.target.date.value,
    };
    console.log(itemdata+"date");
    axios
      .post("/info", itemdata)
      .then((res) => {
        setPostMsg(res.data.msg);
        setName("");
        setOccupation("");
        setEmail("");
        setDate("");
        setTimeout(() => {
          setPostMsg("");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    console.log("hello deletedMsg");
    axios
      .delete(`/info/${id}`)
      .then((res) => {
        setDelMsg(res.data.msg);
        setTimeout(() => {
          setDelMsg("");
        }, 2000);
      })
      .catch((err) => console.log(err));
    const filteredDeleted = infoData.filter((item) => item._id !== id);
    setInfoData(filteredDeleted);
  };

  return (
    <div className="add-product">
      <div className="inside-container">
        <h1>Add Employees</h1>

        <div className="add-product-center">
          <form onSubmit={handleSubmit}>
            <label> Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="inputs"
              value={name}
              onChange={onChangeName}
            />

            <label> Occupation</label>
            <input
              type="text"
              placeholder="Enter occupation"
              className="inputs"
              value={occupation}
              onChange={onChangeOccupation}
            />

            <label> email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="inputs"
              value={email}
              onChange={onChangeEmail}
            />

            <label> date of joining</label>
            <input
              type="date"
              className="inputs"
              name="date"
              // onchange={onChangeDate}
            />

            <button type="submit"> Add</button>
          </form>
          <div className="information">
            <h4 className="postedMsg">{postMsg}</h4>
            <h4 className="deletedMsg">{delMsg}</h4>
            <div className="informations-center">
              {/* <Information /> */}
              {infoData.map((item) => (
                <Information
                  item={item}
                  key={item._id}
                  handleDelete={() => handleDelete(item._id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
