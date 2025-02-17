import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import axios from "axios";
import './homePage.css';

// Main page with navigation links
const HomePage = () => {
  const navigate = useNavigate(); // To programmatically navigate to the FilesDisplayPage
  const [files, setFiles] = useState([]); // State to store fetched files
  const [selectedSemester, setSelectedSemester] = useState(""); // State to track selected semester
  
  // Function to handle Subject links click
  const handleLinkClick = async (semesterLink) => {
    try {
      const response = await axios.post('https://back-c-seven.vercel.app/api/fetchsubjects', { Link: semesterLink });
      setFiles(response.data);
      setSelectedSemester(semesterLink); // Store selected semester
      navigate(`/files/${semesterLink}`); // Navigate to the files display page with semester link
    } catch (error) {
      console.log("Error fetching files:", error);
    }
  };

  return (
    <div className="Navigations">
      <div className="display" style={{ height: "100%", width: "100%", display: "flex" }}>
        <div className="AIML">
          <div className="heading">AIML</div>
          <div className="R20">
            <h3>R20</h3>
            <div className="Links">
              <div onClick={() => handleLinkClick("R20_AIML.2-1Semester")}>2-1 semester</div>
              <div onClick={() => handleLinkClick("R20_AIML.2-2Semester")}>2-2 semester</div>
              <div onClick={() => handleLinkClick("R20_AIML.3-1Semester")}>3-1 semester</div>
              <div onClick={() => handleLinkClick("R20_AIML.3-2Semester")}>3-2 semester</div>
              <div onClick={() => handleLinkClick("R20_AIML.4-1Semester")}>4-1 semester</div>
            </div>
          </div>
          <div className="R23">
            <h3>R23</h3>
            <div className="Links">
              <div onClick={() => handleLinkClick("R23_AIML.2-1Semester")}>2-1 semester</div>
              <div onClick={() => handleLinkClick("R23_AIML.2-2Semester")}>2-2 semester</div>
              <div onClick={() => handleLinkClick("R23_AIML.3-1Semester")}>3-1 semester</div>
              <div onClick={() => handleLinkClick("R23_AIML.3-2Semester")}>3-2 semester</div>
              <div onClick={() => handleLinkClick("R23_AIML.4-1Semester")}>4-1 semester</div>
            </div>
          </div>
        </div>
        <div className="IOT">
          <div className="heading">IOT</div>
          <div className="R20">
            <h3>R20</h3>
            <div className="Links">
              <div onClick={() => handleLinkClick("R20_IOT.2-1Semester")}>2-1 semester</div>
              <div onClick={() => handleLinkClick("R20_IOT.2-2Semester")}>2-2 semester</div>
              <div onClick={() => handleLinkClick("R20_IOT.3-1Semester")}>3-1 semester</div> 
              <div onClick={() => handleLinkClick("R20_IOT.3-2Semester")}>3-2 semester</div>
              <div onClick={() => handleLinkClick("R20_IOT.4-1Semester")}>4-1 semester</div>
            </div>
          </div>
          <div className="R23">
            <h3>R23</h3>
            <div className="Links">
              <div onClick={() => handleLinkClick("R23_IOT.2-1Semester")}>2-1 semester</div>
              <div onClick={() => handleLinkClick("R23_IOT.2-2Semester")}>2-2 semester</div>
              <div onClick={() => handleLinkClick("R23_IOT.3-1Semester")}>3-1 semester</div>
              <div onClick={() => handleLinkClick("R23_IOT.3-2Semester")}>3-2 semester</div>
              <div onClick={() => handleLinkClick("R23_IOT.4-1Semester")}>4-1 semester</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
