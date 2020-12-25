import { React, useState, useEffect } from "react";
import "./Edit.css";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
export default function Editinfo(props) {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [editMsg, setEditMsg] = useState("");
  const [delMsg, setDelMsg] = useState("");
  const [infoData, setInfoData] = useState([]);
  const history = useHistory();
  //getting data from mongo
  useEffect(() => {
    axios.get(`/info/${props.match.params.id}`).then((res) => {
      setName(res.data.name);
      setOccupation(res.data.occupation);
      setEmail(res.data.email);
      setDate(res.data.date);
    });
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    const itemdata = {
      name,
      occupation,
      email,
      date,
    };
    axios.put(`/info/${props.match.params.id}`, itemdata).then((res) => {
      setEditMsg(res.data.msg);
      setTimeout(() => {
        setEditMsg(res.data.msg);
        history.push('/add')
      }, 2000);
    }).catch((err) => {console.log(err)})
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeOccupation = (e) => {
    setOccupation(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  return (
    <div className="edit">
      <h1>update info</h1>
      <div className="inside-container">
        <h4 className="postedMsg">{editMsg}</h4>
        <br />
        <div className="edit-center">
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

            <label> date</label>
            <input
              type="date"
              placeholder="Enter date"
              className="inputs"
              onchange={onChangeDate}
            />

            <button type="submit"> update</button>
            <Link to="/add">
              <button type="submit" className="backBtn">
                {" "}
                Back
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
