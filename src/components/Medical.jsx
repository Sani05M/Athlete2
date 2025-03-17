import React, { useState } from "react";
import { motion } from "framer-motion";

const Medical = () => {
  const [injuries, setInjuries] = useState([]);
  const [newInjury, setNewInjury] = useState({
    date: "",
    type: "",
    description: "",
    recoveryStatus: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInjuries, setFilteredInjuries] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInjury({ ...newInjury, [name]: value });
  };

  const addInjury = () => {
    if (newInjury.date && newInjury.type) {
      const updatedInjuries = [...injuries, { ...newInjury, id: Date.now() }];
      setInjuries(updatedInjuries);
      setFilteredInjuries(updatedInjuries);
      setNewInjury({ date: "", type: "", description: "", recoveryStatus: "" });
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      setFilteredInjuries(
        injuries.filter(
          (injury) =>
            injury.type.toLowerCase().includes(term.toLowerCase()) ||
            injury.description.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredInjuries(injuries);
    }
  };

  const deleteInjury = (id) => {
    const updatedInjuries = injuries.filter((injury) => injury.id !== id);
    setInjuries(updatedInjuries);
    setFilteredInjuries(updatedInjuries);
  };

  return (
    <div className=" max-w-full h-250  bg-gray-900 text-white">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Medical Tracker
      </motion.h1>

      <div className="mb-6 p-4 rounded-lg bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">Add a New Injury</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="date"
            name="date"
            value={newInjury.date}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-700 text-white"
            placeholder="Date of Injury"
          />
          <input
            type="text"
            name="type"
            value={newInjury.type}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-700 text-white"
            placeholder="Type of Injury"
          />
        </div>
        <textarea
          name="description"
          value={newInjury.description}
          onChange={handleInputChange}
          className="mt-4 p-2 w-full rounded bg-gray-700 text-white"
          placeholder="Description of Injury"
        ></textarea>
        <input
          type="text"
          name="recoveryStatus"
          value={newInjury.recoveryStatus}
          onChange={handleInputChange}
          className="mt-4 p-2 w-full rounded bg-gray-700 text-white"
          placeholder="Recovery Status"
        />
        <button
          onClick={addInjury}
          className="mt-4 w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Add Injury
        </button>
      </div>

      <div className="mb-6 p-4 rounded-lg bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">Search Injuries</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 w-full rounded bg-gray-700 text-white"
          placeholder="Search by type or description"
        />
      </div>

      <div className="space-y-4">
        {filteredInjuries.map((injury) => (
          <div key={injury.id} className="p-4 rounded-lg bg-gray-800">
            <h3 className="text-lg font-bold">{injury.type}</h3>
            <p className="text-sm text-gray-400">Date: {injury.date}</p>
            <p className="mt-2">{injury.description}</p>
            <p className="mt-2 text-sm font-medium text-green-400">
              Recovery Status: {injury.recoveryStatus || "Not updated"}
            </p>
            <button
              onClick={() => deleteInjury(injury.id)}
              className="mt-4 p-2 bg-red-600 hover:bg-red-700 rounded text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/012/173/845/original/medical-3d-render-icon-illustration-png.png"
          alt="Athlete illustration"
          className="rounded-lg shadow-lg h-96"
        />
      </div>
    </div>
  );
};

export default Medical;
