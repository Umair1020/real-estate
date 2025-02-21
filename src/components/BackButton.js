import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Importing back arrow icon

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)} 
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200"
    >
      <FaArrowLeft size={20} className="text-gray-700" />
      {/* <span className="text-gray-700 font-medium">Back</span> */}
    </button>
  );
};

export default BackButton;
