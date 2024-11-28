import React from "react";
import "./App.css";
import UserCard from "../UserCard/App";

const Dashboard = (data) => {
  const { grouping, ordering } = data["filters"];
  const tickets = data["tickets"];
  const users = data["users"];

  const priorityMap = {
    1: "Urgent",
    3: "High",
    2: "Medium",
    4: "Low",
    0: "Nopriority",
  };

  const userIdToUsername = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const grouped = () => {
    let statusData = {
      Backlog: [],
      Todo: [],
      "In progress": [],
      Done: [],
      Cancelled: [],
    };
    let priorityData = {
      Nopriority: [],
      Urgent: [],
      High: [],
      Medium: [],
      Low: [],
    };
    let userData = {};
    if (grouping === "status") {
      tickets.forEach((ticket) => {
        if (statusData[ticket.status]) {
          statusData[ticket.status].push(ticket);
        }
      });
      return statusData;
    } else if (grouping === "user") {
      userData = tickets.reduce((acc, ticket) => {
        const username = userIdToUsername[ticket.userId];
        acc[username] = acc[username] || [];
        acc[username].push(ticket);
        return acc;
      }, {});
      return userData;
    } else if (grouping === "priority") {
      tickets.forEach((ticket) => {
        let p = priorityMap[ticket.priority];
        if (priorityData[p]) {
          priorityData[p].push(ticket);
        }
      });
      return priorityData;
    }
  };

  const sortedTickets = (tickets) => {
    if (ordering === "orderPriority") {
      return [...tickets].sort((a, b) => a.priority - b.priority);
    } else if (ordering === "orderTitle") {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupData = grouped();
  console.log(groupData);

  return (
    <div className="dashboard">
      {Object.keys(groupData).map((groupKey) => (
        <div key={groupKey} className="group">
          <h3>{groupKey}</h3>
          <div className="group-divider">
            {sortedTickets(groupData[groupKey]).map((ticket) => (
              <UserCard key={ticket.id} ticketData={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
