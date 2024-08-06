// ViewWorks.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewWorks.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewWorks = () => {
  const [works, setWorks] = useState([]);
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    chief_engineer_zone: "",
    circle: "",
    division_name: "",
    name_of_agency: "",
    place_of_work: "",
    item_of_work: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/works")
      .then((response) => {
        setWorks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the works!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredWorks = works.filter((work) => {
    const workDate = work.date ? new Date(work.date) : null;
    const startDate = filter.startDate ? new Date(filter.startDate) : null;
    const endDate = filter.endDate ? new Date(filter.endDate) : null;

    return (
      (!startDate || !workDate || workDate >= startDate) &&
      (!endDate || !workDate || workDate <= endDate) &&
      (work.chief_engineer_zone?.toLowerCase() || "").includes(
        filter.chief_engineer_zone.toLowerCase()
      ) &&
      (work.circle?.toLowerCase() || "").includes(
        filter.circle.toLowerCase()
      ) &&
      (work.division_name?.toLowerCase() || "").includes(
        filter.division_name.toLowerCase()
      ) &&
      (work.name_of_agency?.toLowerCase() || "").includes(
        filter.name_of_agency.toLowerCase()
      ) &&
      (work.place_of_work?.toLowerCase() || "").includes(
        filter.place_of_work.toLowerCase()
      ) &&
      (work.item_of_work?.toLowerCase() || "").includes(
        filter.item_of_work.toLowerCase()
      )
    );
  });

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredWorks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Works");
    XLSX.writeFile(wb, "works.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Date",
      "Chief Engineer Zone",
      "Circle",
      "Division Name",
      "Name of Agency",
      "Place of Work",
      "Item of Work",
      "Quantity",
      "Unit",
      "Rate",
      "Amount",
    ];
    const tableRows = [];

    filteredWorks.forEach((work) => {
      const workData = [
        work.date ? new Date(work.date).toLocaleDateString() : "",
        work.chief_engineer_zone || "",
        work.circle || "",
        work.division_name || "",
        work.name_of_agency || "",
        work.place_of_work || "",
        work.item_of_work || "",
        work.quantity || "",
        work.unit || "",
        work.rate || "",
        work.amount || "",
      ];
      tableRows.push(workData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Works Report", 14, 15);
    doc.save("works.pdf");
  };

  return (
    <div className="view-works-container">
      <h2 className="view-works-title">View Works</h2>
      <div className="filters">
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={filter.startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={filter.endDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="chief_engineer_zone"
          placeholder="Filter by Chief Engineer Zone"
          value={filter.chief_engineer_zone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="circle"
          placeholder="Filter by Circle"
          value={filter.circle}
          onChange={handleChange}
        />
        <input
          type="text"
          name="division_name"
          placeholder="Filter by Division Name"
          value={filter.division_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name_of_agency"
          placeholder="Filter by Name of Agency"
          value={filter.name_of_agency}
          onChange={handleChange}
        />
        <input
          type="text"
          name="place_of_work"
          placeholder="Filter by Place of Work"
          value={filter.place_of_work}
          onChange={handleChange}
        />
        <input
          type="text"
          name="item_of_work"
          placeholder="Filter by Item of Work"
          value={filter.item_of_work}
          onChange={handleChange}
        />
      </div>
      <div className="download-buttons">
        <button onClick={downloadExcel}>Download Excel</button>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>
      <div className="table-container">
        <table className="works-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Chief Engineer Zone</th>
              <th>Circle</th>
              <th>Division Name</th>
              <th>Name of Agency</th>
              <th>Place of Work</th>
              <th>Item of Work</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorks.map((work) => (
              <tr key={work.id}>
                <td>{work.date ? formatDisplayDate(work.date) : ""}</td>
                <td>{work.chief_engineer_zone || ""}</td>
                <td>{work.circle || ""}</td>
                <td>{work.division_name || ""}</td>
                <td>{work.name_of_agency || ""}</td>
                <td>{work.place_of_work || ""}</td>
                <td>{work.item_of_work || ""}</td>
                <td>{work.quantity || ""}</td>
                <td>{work.unit || ""}</td>
                <td>{work.rate || ""}</td>
                <td>{work.amount || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const formatDisplayDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default ViewWorks;
