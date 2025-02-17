import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import './homePage.css';

const SubjectsPage = () => {
  const { semester } = useParams(); // Get the semester from the URL
  const [files, setFiles] = useState([]); // State to store files
  const navigate = useNavigate(); // To navigate to the FileDetailsPage

  // Fetch files based on the semester when the component mounts
  useEffect(() => {
    axios.post('https://back-c-seven.vercel.app/api/fetchsubjects', { Link: semester })
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.log("Error fetching files:", error);
      });
  }, [semester]); // Runs every time semester changes

  const [Regulation, Semester] = semester.split('.');

  // Handle the click on a file and navigate to the new page with the fileName
  const handleFileClick = (fileName) => {
    const [Regulation, Semester] = semester.split('.');
    navigate(`/file-details/${Regulation}/${Semester}/${fileName}`);
  };

  return (
    <div className="Navigations" style={{height: "70%"}}>
      <div className="FilesDisplay" style={{height: "100%", minWidth: "100%"}}>
        <div className="Path">
          <div className="Regulation">{Regulation}</div>
          <div className="Semester">{Semester}</div>
        </div>
        {files.length > 0 ? (
          <ul>
            {files.map((file, index) => (
              <li key={index} className="SubjectsList" onClick={() => handleFileClick(file)}>
                {file.split('.')[1].toUpperCase()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No Subjects available for this semester.</p>
        )}
      </div>
    </div>
  );
};

export default SubjectsPage;
