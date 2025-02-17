import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import './homePage.css';

const CategoryPage = () => {
  const { Regulation, Semester, fileName } = useParams(); // Get the fileName from the URL

  // Static categories to display
  const categories = ["Notes", "Question Papers", "Question Bank", "PPTs"];
  const navigate = useNavigate();

  //Set Default Subject Codes
  const SubjectCodes = {
    "R20_AIML.Mathematics-III" : "R20_AIML_M-III",
    "R20_AIML.Mathemetical Foundations Of Computer Science" : "R20_AIML_MFCS",
    "R20_AIML.DataBase Management System" : "R20_AIML_DBMS",
    "R20_AIML.INTRODUCTION TO ARTIFICIAL INTELLIGENCE AND MACHINE LEARNINGE" : "R20_AIML_INTRO AIML",
    "R20_AIML.OBJECT ORIENTED PROGRAMMING WITH JAVA" : "R20_AIML_OOPS JAVA",
    "R20_AIML.Probability and Statistics" : "R20_AIML_P&S",
    "R20_AIML.Formal Languages and Automata Theory" : "R20_AIML_FLAT",
    "R20_AIML.Managerial Economics and Financial Accountancy" : "R20_AIML_MEFA",
    "R20_AIML.COMPUTER ORGANIZATION" : "R20_AIML_CO",
    "R20_AIML.DATA WAREHOUSING AND MINING" : "R20_AIML_DWDM",
    "R20_AIML.SOFTWARE ENGINEERING" : "R20_AIML_SE",
    "R20_AIML.MACHINE LEARNING" : "R20_AIML_ML",
    "R20_AIML.OPERATING SYSTEMS" : "R20_AIML_OS",
    "R20_AIML.COMPILER DESIGN" : "R20_AIML_CD",
    "R20_AIML.DEVOPS": "R20_AIML_DEVOPS",
    "R20_AIML.DESIGN AND ANALYSIS OF ALGORITHMS" : "R20_AIML_DAA",
    "R20_AIML.SOFTWARE PROJECT MANAGEMENT" : "R20_AIML_SPM",
    "R20_AIML.DEEP LEARNING" : "R20_AIML_DL",
    "R20_AIML.COMPUTER NETWORKS" : "R20_AIML_CN",
    "R20_AIML.MEAN Stack Development" : "R20_AIML_MSD",
    "R20_AIML.Crytography and Networks Security" : "R20_AIML_CNS",
    "R20_AIML.Cloud Computing" : "R20_AIML_CC",
    "R20_AIML.Object Oriented Analysis And Design" : "R20_AIML_OOAD",
    "R20_AIML.APi and Micro Services" : "R20_AIML_APiMS",
    "R20_AIML.Secure Coding Techniques" : "R20_AIML_SCT",
    "R20_AIML.Universal Human values" : "R20_AIML_UHV",

    "R23_AIML.Advance Data Structures" : "R23_AIML_ADS",
    "R23_AIML.ARTIFICIAL INTELLIGENCE" : "R23_AIML_AI",
    "R23_AIML.Discrete Mathematiics and Graph Theory" : "R23_AIML_DMGT",
    "R23_AIML.EnvironMental Science" : "R23_AIML_ES",
    "R23_AIML.Object Oriented Programming Through Java" : "R23_AIML_OOPJ",
    "R23_AIML.DataBase Management System" : "R23_AIML_DBMS",
    "R23_AIML.Design Thinking and Innovation" : "R23_AIML_DTI",
    "R23_AIML.Full Stack Development" : "R23_AIML_FSD",
    "R23_AIML.machine Learning" : "R23_AIML_ML",
    "R23_AIML.Optimization techniques" : "R23_AIML_OT",
    "R23_AIML.Probability and Statistics" : "R23_AIML_P&S",

    "R20_IOT.Mathematics-III" : "R20_IOT_M-III",
    "R20_IOT.Mathemetical Foundations Of Computer Science" : "R20_IOT_MFCS",
    "R20_IOT.Data Structures" : "R20_IOT_DS",
    "R20_IOT.OPERATING SYSTEMS" : "R20_IOT_OS",
    "R20_IOT.JAVA Programming" : "R20_IOT_JP",
    "R20_IOT.COMPUTER ORGANIZATION AND ARCHITECTURE" : "R20_IOT_COA",
    "R20_IOT.Probability and Statistics" : "R20_IOT_P&S",
    "R20_IOT.Formal Languages and Automata Theory" : "R20_IOT_FLAT",
    "R20_IOT.DataBase Management System" : "R20_IOT_DBMS",
    "R20_IOT.Managerial Economics and Financial Accountancy" : "R20_IOT_MEFA",
    "R20_IOT.DESIGN AND ANALYSIS OF ALGORITHMS" : "R20_IOT_DAA",
    "R20_IOT.IOt Architecture and Protocols" : "R20_IOT_IAP",
    "R20_IOT.COMPUTER NETWORKS" : "R20_IOT_CN",
    "R20_IOT.Cloud Computing" : "R20_IOT_CC",
    "R20_IOT.Software Engineering" : "R20_IOT_SE",
    "R20_IOT.Embeded Systems Design" : "R20_IOT_ESD",
    "R20_IOT.MACHINE LEARNING" : "R20_IOT_ML",
    "R20_IOT.Sensors and Actors Device For IOT" : "R20_IOT_SADIOT",

    "R23_IOT.Advanced Data Structures & Algorithms Analysis" : "R23_IOT_ADAA",
    "R23_IOT.Digital Logic & Computer Organization" : "R23_IOT_DLCO",
    "R23_IOT.Discrete Mathematics & Graph Theory" : "R23_IOT_DMGT",
    "R23_IOT.Object Oriented Programming Through Java" : "R23_IOT_OOPJ",
    "R23_IOT.Computer Networks" : "R23_IOT_CN",
    "R23_IOT.Design Thinking & Innovation" : "R23_IOT_DTI",
    "R23_IOT.Managerial Economic and Financial Analysis" : "R23_IOT_MEFA",
    "R23_IOT.Microprocessors & Microcontrollers " : "R23_IOT_MPMC",
    "R23_IOT.Operating Systems " : "R23_IOT_OS",
    "R23_IOT.Probability & Statistics" : "R23_IOT_P&S",
    "R23_IOT.Full Stack Development-I" : "R23_IOT_FSDI",
  }


  // Function to handle category click and navigate to the new page with the category and fileName
  const handleCategoryClick = (category, fileName, Regulation, Semester) => {
    navigate(`/file-display/${Regulation}/${Semester}/${SubjectCodes[fileName]}/${category}`); // Navigate to the new page with the category and fileName
  };

  return (
    <div className="Navigations" style={{height: "70%"}}>
      <div className="FileDetailsPage">
        <div className="Path">
          <div className="Regulation">{Regulation}</div>
          <div className="Semester">{Semester}</div>
          <div className="FileName">{SubjectCodes[fileName].split('_')[2]}</div>
        </div>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="CategoryItem" onClick={() => handleCategoryClick(category, fileName, Regulation, Semester)}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryPage;
