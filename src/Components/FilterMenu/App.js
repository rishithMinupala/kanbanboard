import React from "react";
import "./App.css";
import { useState } from "react";

function Filter({ onFilterChange }) {
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("orderPriority");

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
    onFilterChange({ grouping: e.target.value, ordering });
  };

  const handleOrderingChange = (e) => {
    setOrdering(e.target.value);
    onFilterChange({ grouping, ordering: e.target.value });
  };

  return (
    <div className="filter_main">
      <div className="filter_group">
        <p className="group_text">Grouping</p>
        <select
          className="group_select"
          value={grouping}
          onChange={handleGroupingChange}
        >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="filter_group">
        <p className="group_text">Ordering</p>
        <select
          className="group_select"
          value={ordering}
          onChange={handleOrderingChange}
        >
          <option value="orderPriority">Priority</option>
          <option value="orderTitle">Title</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
