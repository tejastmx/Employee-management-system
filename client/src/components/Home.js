import React, { useState, useEffect } from "react";
import Information from "../components/Information";
import axios from "axios";

export default function Home() {
  const [infoData, setInfoData] = useState([]);
  const [delMsg, setDelMsg] = useState("");
  useEffect(() => {
    axios.get(`/info`).then((res) => {
      setInfoData(res.data);
    });
  });

  const handleDelete = (id) => {
    console.log("hello deletedMsg");
    axios
      .delete(`/info/${id}`)
      .then((res) => {
    
        setTimeout(() => {
          setDelMsg("");
        }, 2000);
      })
      .catch((err) => console.log(err));
    const filteredDeleted = infoData.filter((item) => item._id !== id);
    setInfoData(filteredDeleted)
  };

  return (
    <div className="home">
      <div className="container">
        <h2> Employee Information</h2>
        <div className="inside-conatiner">
        <h4 className="deletedMsg">{delMsg}</h4>
          <div className="informations-center">
            {infoData.map((item) => { 
            return  <Information item={item} key={item._id} handleDelete={()=>handleDelete(item._id)}/>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
