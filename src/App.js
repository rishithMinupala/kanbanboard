import menu from "./icons_FEtask/3 dot menu.svg";
import display from "./icons_FEtask/Display.svg";
import down from "./icons_FEtask/down.svg";
import { useState, useEffect } from "react";
import Filter from "./Components/FilterMenu/App";
import "./App.css";

import Dashboard from "./Components/Dashboard/App";

function App() {
  const [showFilter, setShowFilter] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : { grouping: "status", ordering: "orderPriority" };
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const showFilterMenu = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  return (
    <div className="App">
      <div className="header">
        <button className="dropdown" onClick={showFilterMenu}>
          <img src={display} alt="display" className="img_display" />
          <p className="btn-text">Display</p>
          <img src={down} alt="down" className="img_display" />
        </button>
        {showFilter && <Filter onFilterChange={handleFilterChange} />}
      </div>
      <Dashboard filters={filters} tickets={tickets} users={users} />
    </div>
  );
}

export default App;
