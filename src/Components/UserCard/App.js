import React from "react";
import "./App.css";

const UserCard = ({ ticketData }) => {
  console.log(ticketData);
  const { id, title, tag, userId, status, priority } = ticketData;

  return (
    <div className="card_main">
      <h1 className="id">{id}</h1>
      <p className="title">{title}</p>
      <div className="tag">
        <p className="tag_text">{priority}</p>
        <p className="tag_text">{tag}</p>
      </div>
    </div>
  );
};

export default UserCard;
