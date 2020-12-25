import {React,useState} from "react";
import { Link } from "react-router-dom";
export default function Information(props) {
  const { item, handleDelete } = props;
  return (
    <div className="single-info">
      <div className="info dateIcons">
        <div className="date">{item.date.substring(0, 10)}</div>
        <div className="icons">
          <Link to={`/edit/${item._id}`}>
            <i className="fas fa-edit"></i>
          </Link>
          <i className="fas fa-trash" onClick={handleDelete}></i>
        </div>
      </div>

      <div className="info">
        <label>name</label>
        <p>{item.name}</p>
      </div>

      <div className="info">
        <label>occupation</label>
        <p>{item.occupation}</p>
      </div>

      <div className="info">
        <label>email</label>
        <p>{item.email}</p>
      </div>
    </div>
  );
}
